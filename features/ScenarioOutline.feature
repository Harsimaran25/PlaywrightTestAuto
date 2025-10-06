# this is another feature file to understand scenario outline and examples which is how the tests are parameterised using cucumber
# using cucumber we can run parallel scenarios that means if a feature file has 10 or more scenarios we can run them parallel
# to run scenarios in parallel u can use cLI command -- > npx cucumber-js features/abc.feature --parallel 2 --exit
# number 2 means run 2 scenarios in parallel we can give any number like parallel 10 to run 10 scenarios parallely
# but we CANNOT run feature files parallel that means we cannot run 2 or more feature files parallel that is limitation with cucumber

Feature: Error message


    Scenario Outline: To validate error message
        Given user logs with "<username>" and  "<password>" to site
        Then Error message is displayed for invalid login
        Examples:
            | username | password |
            | shetty   | Bhakha2  |
            | learning | magha    |