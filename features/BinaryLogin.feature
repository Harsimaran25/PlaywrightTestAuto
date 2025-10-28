Feature: User login to Binaryville

    Scenario: Successful Login with Valid Credentials
        Given the user is on the login Page
        When user enters a valid email and password
        Then the user should see their email and password in the url