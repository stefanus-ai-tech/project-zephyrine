if(EXISTS "/Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build/dot_test[1]_tests.cmake")
  include("/Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build/dot_test[1]_tests.cmake")
else()
  add_test(dot_test_NOT_BUILT dot_test_NOT_BUILT)
endif()
