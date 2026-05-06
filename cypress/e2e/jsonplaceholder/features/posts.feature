@api @posts
Feature: Post Lifecycle Management
  As an API consumer 
  I want to manage blog posts via the JSONPlaceholder API
  So that I can verify data integrity across the system

  Scenario: Create, Verify, and Update a post
    When I create a new post with title "Cross-Skilling" and body "Focus 3 API Test"
    Then the response status should be 201
    And the response should include a new ID

    When I fetch all posts for userId 1
    Then I should receive exactly 10 posts

    When I update post 1 with title "Updated Title"
    Then the response status should be 200
    And the post title should be "Updated Title"

    When I delete post 1
    Then the response status should be 200