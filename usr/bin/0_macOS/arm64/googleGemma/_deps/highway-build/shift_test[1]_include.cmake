if(EXISTS "/Users/user/Documents/misc/AI/LLM/alpaca-electron-zephyrine/usr/vendor/gemma.cpp/build/_deps/highway-build/shift_test[1]_tests.cmake")
  include("/Users/user/Documents/misc/AI/LLM/alpaca-electron-zephyrine/usr/vendor/gemma.cpp/build/_deps/highway-build/shift_test[1]_tests.cmake")
else()
  add_test(shift_test_NOT_BUILT shift_test_NOT_BUILT)
endif()