# This is a comment explaining the feature below
Feature: Login to Rahulshetty

    Scenario: Verify product ordering using getbylocator
        Given user logs to site with "userName" and "passWord"
        When user adds product "ZARA COAT 3" to cart
        Then verify product is added to the cart
        And product is present in orderhistory page