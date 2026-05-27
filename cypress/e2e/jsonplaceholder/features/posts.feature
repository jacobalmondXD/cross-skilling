@api @posts
Feature: Post Lifecycle Management
As an API consumer
I want to manage blog posts via the JSONPlaceholder API
So that I can verify data integrity across the system

Scenario: Create a new post (POST)
    When I create a new post
    Then the response status should be 201
    And the ID in the response should be 101

Scenario: Fetch filtered data (GET)
    When I fetch all posts for userId 1
    Then I should receive 10 posts
    And every post should belong to userId 1

Scenario: Replace a post (PUT)
    When I replace the target post with replacement data
    Then the response status should be 200
    And the post title should match the replacement data
    And the post body should match the replacement data

# Scenario: Partially update a post (PATCH)
#     When I update only the title of the target post
#     Then the response status should be 200
#     And the post title should match the patched title
#     And the original body should still be present in the response

# Scenario: Remove a post (DELETE)
#     When I delete the target post
#     Then the response status should be 200