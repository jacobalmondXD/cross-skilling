@api @posts
Feature: Post Lifecycle Management
As an API consumer
I want to manage blog posts via the JSONPlaceholder API
So that I can verify data integrity across the system

Scenario: Create a new post (POST)
    When I create a new post
    Then the response status should be 201
    And the ID in the response should be 101

Scenario: Fetch all posts (GET)
    When I fetch all posts
    Then the response status should be 200
    And I should receive a list of posts matching the expected total count

Scenario: Fetch a post by ID (GET)
    When I fetch the target post
    Then the response status should be 200
    And the response should match the expected post data

Scenario: Fetch filtered data (GET)
    When I fetch all posts for the target user
    Then I should receive the expected number of posts
    And every post should belong to the target user

Scenario: Fetch nested resources (GET)
    When I fetch the target post with embedded comments
    Then the response status should be 200
    And every item in the response should have a post ID matching the one specified
    And every item in the response should have a name and email

Scenario: Replace a post (PUT)
    When I replace the test post with replacement data
    Then the response status should be 200
    And the post title should match the replacement data
    And the post body should match the replacement data

Scenario: Partially update a post (PATCH)
    When I update the test post with patched data
    Then the response status should be 200
    And the post title should match the patched title
    And the original body should still be present in the response

Scenario: Remove a post (DELETE)
    When I delete the test post
    Then the response status should be 200