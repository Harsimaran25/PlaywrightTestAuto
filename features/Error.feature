#to validate error message when entering wrong credentials using tag

Feature: Error message
    #tag is below   to run from CLI -- > npx cucumber-js  --tags "@ErrorCheck"
    @ErrorCheck

    Scenario: To validate error message
        Given user logs with "rahulshetty" and password as "Bhakha1234" to site
        Then Error message is displayed
