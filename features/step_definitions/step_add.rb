Given(/^Fill textfield with "([^"]*)" and "([^"]*)"$/) do |arg1, arg2|
  sleep 1
  click_button('addBookmark')

  fill_in('bookmarkName', :with => arg1)
  fill_in('bookmarkAddress', :with => arg2)
  sleep 1

  click_button('confirm')
end
