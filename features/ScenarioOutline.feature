# this is another feature file to understand scenario outline and examples which is how the tests are parameterised using cucumber


Feature: Error message


    Scenario Outline: To validate error message
        Given user logs with "<username>" and  "<password>" to site
        Then Error message is displayed for invalid login
        Examples:
            | username | password |
            | shetty   | Bhakha2  |
            | learning | magha    |