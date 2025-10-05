#to validate error message when entering wrong credentials using tag

Feature: Error message
    #tag is below
    @ErrorCheck

    Scenario: To validate error message
        Given user logs with "rahulshetty" and password as "Bhakha1234" to site
        Then Error message is displayed
