Given(/^Open the homepage$/) do
  visit ('/')
  sleep 1
end

Given(/^Search "([^"]*)"$/) do | search_content |
  fill_in 'keywords', with: search_content
  sleep 1
end

Given(/^Have (\d+) result$/) do | expect |
  result = all('.info-box')
  sleep 1
  expect(result.length).to equal expect.to_i
end
