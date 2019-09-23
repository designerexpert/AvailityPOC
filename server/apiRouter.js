const express = require("express");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const parse = require("csv-parse");
const router = express.Router();

/*
    The Public Secret is typically mounted upon deployment
    Location: /etc/jwt/secrets/publicSecretFilename.pem
*/
const secret = fs.readFileSync("./server/notSoSecret.pem", "utf8");
const publicSecret = fs.readFileSync("./server/secretRS256PUB.pem", "utf8");

/* Generation of a Test Token */
const generateToken = (req, res) => {
    try {
        // Sample Payload, Consider Retrieving the actual Roles, Name, Etc from DB relating the user.
        const payload = {
            sub: "test",
            name: "designerexpert",
            roles: ["SOME, ROLE, HERE", "ANOTHER, ROLE, HERE"],
            adGroups: ["SOME_AD_GROUP", "ANOTHER_AD_GROUP"]
        };
        // Token Expiration set to 5 minutes.
        const token = jwt.sign(payload, secret, {
            algorithm: "RS256",
            expiresIn: 60 * 5
        });
        res.setHeader("Authorization", `Bearer ${token}`);
        res.send({ token: `Bearer ${token}` });
    } catch (err) {
        // console.log("ERROR GENERATING JWT TOKEN", err.message, err);
        res.status(500).json({
            message: "Unable to generate JWT Token: " + err.message,
            err
        });
    }
};

/* Validating A Token */
validateToken = (req, res) => {
    try {
        const rawToken = req.headers.authorization;
        const jwtToken = rawToken.replace("Bearer ", "");
        // console.log("JWT TOKEN", jwtToken);
        const validJwt = jwt.verify(jwtToken, publicSecret, {
            algorithm: "RS256"
        });
        res.send({ decodedToken: validJwt });
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

/* Enrollment CSV */
const parseEnrollmentCSV = async (req, res) => {
    const { fileString, fileName } = req.body;
    // First Write The File as is to a Raw Zone. For Later Recon to be Performed.
    // TODO: CONSIDER APPENDING TO FILE IF FILE ALREADY EXISTS
    const rawFileName = `./server/enrollment-files/raw/${fileName}`;
    await fs.writeFile(rawFileName, fileString, "utf8", err => {
        if (err) {
            console.error("FAILURE WRITING CSV TO RAW:", rawFileName);
            return res.status(500).end();
        } else {
            // console.log("SUCCESS WRITING CSV TO RAW:", rawFileName);
        }
    });

    // Then Parse the file into Insurance Sections.
    const insuranceSections = {};
    const insuranceIds = {};
    let headers = [];
    const rawOutput = [];

    let record;
    let rowCount = 0;
    let duplicatesCount = 0;
    let insIdx = 0;
    let idIdx = 0;
    let versionIdx = 0;
    let lastNameIdx = 0;
    let firstNameIdx = 0;

    // Variables for Response
    const responseObj = {};

    parse(fileString, {
        trim: true,
        skip_empty_lines: true,
        delimiter: ","
    })
        .on("readable", function() {
            while ((record = this.read())) {
                // EXTRACT INFORMATION FROM THE HEADERS
                if (rowCount === 0) {
                    headers = record;
                    responseObj.headersFound = record;
                    insIdx = record.indexOf("InsuranceCompany");
                    idIdx = record.indexOf("UserID");
                    versionIdx = record.indexOf("Version");
                    lastNameIdx = record.indexOf("LastName");
                    firstNameIdx = record.indexOf("FirstName");
                } else {
                    if (!insuranceSections[record[insIdx]]) {
                        // IF NO ENTRY EXISTS FOR THIS INSURANCE COMPANY, CREATE ONE
                        insuranceSections[record[insIdx]] = {
                            name: record[insIdx],
                            records: [record]
                        };
                        // KEEP TRACK OF IDs for Each Specific Insurance Company in a separate HASH
                        insuranceIds[record[insIdx]] = {
                            name: record[insIdx],
                            IDs: [record[idIdx]]
                        };
                    } else {
                        // APPEND TO ITS RECORDS
                        const indexOfCurrentId = insuranceIds[
                            record[insIdx]
                        ].IDs.indexOf(record[idIdx]);

                        if (indexOfCurrentId > -1) {
                            // console.log("FOUND A RECORD WITH SAME ID");
                            // IF THERE IS AN ID MISMATCH PICK THE HIGHEST VERSION
                            const existingRecord =
                                insuranceSections[record[insIdx]].records[
                                    indexOfCurrentId
                                ];
                            if (
                                Number(existingRecord[versionIdx]) <
                                Number(record[versionIdx])
                            ) {
                                // console.log("REPLACING WITH NEW VERSION");
                                insuranceSections[record[insIdx]].records[
                                    indexOfCurrentId
                                ] = record;
                            }
                            duplicatesCount++;
                        } else {
                            insuranceSections[record[insIdx]].records.push(
                                record
                            );
                            insuranceIds[record[insIdx]].IDs.push(
                                record[idIdx]
                            );
                        }
                    }
                    rawOutput.push(record);
                }
                rowCount++;
            }
        })
        .on("end", function() {
            // console.log("FINISHED PARSING FILE");
            // console.log("HEADERS", headers);
            // console.log("INSURANCE", insuranceSections);
            // console.log("IDS", insuranceIds);

            const insuranceCompanies = Object.keys(insuranceSections);
            responseObj.insuranceCompanies = insuranceCompanies;
            responseObj.recordsPerInsuranceCompany = [];
            insuranceCompanies.forEach(companyName => {
                // SORT EACH COMPANY's RECORDS ACCORDINGLY
                const content = insuranceSections[companyName];
                const sortedRecords = content.records.sort((a, b) => {
                    const aName = a[lastNameIdx];
                    const bName = b[lastNameIdx];
                    const aFName = a[firstNameIdx];
                    const bFName = b[firstNameIdx];
                    // CONSIDERING LAST NAME FIRST
                    if (aName > bName) return 1;
                    if (aName < bName) return -1;
                    // CONSIDERING FIRST NAME ALSO
                    if (aFName > bFName) return 1;
                    if (aFName < bFName) return -1;
                    return 0;
                });
                insuranceSections[companyName].records = sortedRecords;
                responseObj.recordsPerInsuranceCompany.push(
                    insuranceSections[companyName]
                );
                let data = headers.join(",") + "\n";
                sortedRecords.forEach(record => {
                    data += record.join(",") + "\n";
                });
                // console.log("DATA TO WRITE", data);
                const fileToWrite = `./server/enrollment-files/refined/${companyName}.csv`;
                // TODO: CONSIDER APPENDING TO FILE IF FILE ALREADY EXISTS
                fs.writeFile(fileToWrite, data, "utf8", err => {
                    if (err) {
                        console.error("FAILURE WRITING:", fileToWrite, err);
                        return res.status(500).end();
                    }
                    // else console.log("SUCESS WRITING FILE:", fileToWrite);
                });
            });
            responseObj.totalRecordsProcessed = rowCount;
            responseObj.totalDuplicateRecords = duplicatesCount;
            res.send(responseObj);
        });
};

router.get("/token", generateToken);
router.get("/auth", validateToken);

router.post("/enrollment", parseEnrollmentCSV);

module.exports = router;
