Given(/^Delete number (\d+) delete button$/) do |arg1|
  result = all('[data-toggle="modal"]')
  puts result[(arg1.to_i-1)].click
  sleep 2
  page.driver.browser.switch_to.alert.accept
  sleep 2
end
