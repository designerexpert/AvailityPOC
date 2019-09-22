# 1. Tell me about your proudest professional achievement. It can be a personal or school project.

Leading the Team that Finalized the Production of The Executive Dashboard at Florida Blue. In under 3 months we completed 82 reports and over 120 views that integrated analytics querying Hadoop, Hive, SQL, and PostgreSQL. The project was being developed for 2 years without progress and was about to be cancelled by business, but we were able to finish it in record time. It used latest React JS and Server Side Rendering using Next JS which I had to learn in less than one week, and then taught it to the rest of the team in order for them to be able to assist me in development. The application's components are now used in a multitude of apps in the Florida Blue Ecosystem, components like Usage Logs and Usage Reporting that track the users journey through the application and send automatic notifications to production support if the user encounters any issues while using the application, also Maps and Charts that were made reusable with multiple levels of drilling for reporting and analysis.

The reason that I am proud of this project, is that I was assigned to it just 2 days after arriving at Florida Blue and I was very proud that they would trust me with such an important task and team, but also the impact it had in the rest of the business and how it brought visibility of company wide operational data to the Executives which usually had to wait months to make decisions, and with the help of the new applications they had all of it at their fingertips without the need to wait.

# 2. Tell me a about a book, blog, article or GitHub repo you read or liked recently, and why you like it and why you should recommend I do the same.

Well i have 2 favorite books, and the list could get long because I believe it is not fair to speak about just one. However if I had to pick it would probably be "You Don't Know Js", second by "The Mythical Man Month". But the reason I picked "You Don't Know Js" is because it relates to the latest part of my life and how I have been developing using JavaScript in the last 10 years or so. This book covers all of the darker intricacies of JavaScript and aims at explaining and demystifying the language. It covers Closures and Scope elegantly and even goes over the interpreter and hoisting in a very adequate way which helps illustrate and understand just how JavaScript works under the hood. The Mythical Man Month however relates to my whole professional life, and not just the latest part of it, and while it has lots of truth it also brings a bit of humor to realize that all the problems that we had back in the days during software development are still existing now and how we solve them has not changed much, because languages of programming may change but the most common variable is the Human Programmer :)

# 3. If you were to describe to a 7-year old what Availity does, what would you say?

Availity is a company that helps doctors, nurses, and pharmacies charge for their services and products, and find out if someone is able to pay for those services they render by connecting with insurance companies that pay in the patient's behalf. They also help doctors and nurses understand the different ways insurances pay and help them in the process of submitting information about work they did in order to be compensated for their work. Availity acts in essence as the middle man between doctors, nurses, and pharmacies and the different insurance companies, and it aids both parties with information about each other all in one place without having to go look everywhere for it.

# 4.Coding exercise: You are tasked to write a checker that validates the parentheses of a LISP code. Write a program (in Java or JavaScript) which takes in a string as an input and returns true if all the parentheses in the string are properly closed and nested.

The Content for this section can be found in: `./matchingParenthesis.js`
Below is the code as well for reference.
```JavaScript
exports.matchingParenthesis = str => {
    const openBracketsMem = [];
    const pairsHash = { "{": "}", "[": "]", "(": ")" };
    const closers = { "}": true, "]": true, ")": true };

    for (let i = 0; i < str.length; i++) {
        let currentCharacter = str[i];
        if (pairsHash[currentCharacter]) {
            openBracketsMem.push(currentCharacter);
        } else if (closers[currentCharacter]) {
            if (pairsHash[openBracketsMem.pop()] !== currentCharacter)
                return false;
        }
    }

    return openBracketsMem.length === 0;
};
```

