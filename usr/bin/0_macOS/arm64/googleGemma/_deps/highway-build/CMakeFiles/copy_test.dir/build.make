# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.28

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /opt/homebrew/Cellar/cmake/3.28.3/bin/cmake

# The command to remove a file.
RM = /opt/homebrew/Cellar/cmake/3.28.3/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build

# Include any dependencies generated for this target.
include _deps/highway-build/CMakeFiles/copy_test.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include _deps/highway-build/CMakeFiles/copy_test.dir/compiler_depend.make

# Include the progress variables for this target.
include _deps/highway-build/CMakeFiles/copy_test.dir/progress.make

# Include the compile flags for this target's objects.
include _deps/highway-build/CMakeFiles/copy_test.dir/flags.make

_deps/highway-build/CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.o: _deps/highway-build/CMakeFiles/copy_test.dir/flags.make
_deps/highway-build/CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.o: _deps/highway-src/hwy/contrib/algo/copy_test.cc
_deps/highway-build/CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.o: _deps/highway-build/CMakeFiles/copy_test.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object _deps/highway-build/CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.o"
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build && /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT _deps/highway-build/CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.o -MF CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.o.d -o CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.o -c /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-src/hwy/contrib/algo/copy_test.cc

_deps/highway-build/CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.i"
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build && /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-src/hwy/contrib/algo/copy_test.cc > CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.i

_deps/highway-build/CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.s"
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build && /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-src/hwy/contrib/algo/copy_test.cc -o CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.s

# Object files for target copy_test
copy_test_OBJECTS = \
"CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.o"

# External object files for target copy_test
copy_test_EXTERNAL_OBJECTS =

_deps/highway-build/tests/copy_test: _deps/highway-build/CMakeFiles/copy_test.dir/hwy/contrib/algo/copy_test.cc.o
_deps/highway-build/tests/copy_test: _deps/highway-build/CMakeFiles/copy_test.dir/build.make
_deps/highway-build/tests/copy_test: _deps/highway-build/libhwy.a
_deps/highway-build/tests/copy_test: _deps/highway-build/libhwy_test.a
_deps/highway-build/tests/copy_test: _deps/highway-build/libhwy_contrib.a
_deps/highway-build/tests/copy_test: lib/libgtest.a
_deps/highway-build/tests/copy_test: lib/libgtest_main.a
_deps/highway-build/tests/copy_test: _deps/highway-build/libhwy.a
_deps/highway-build/tests/copy_test: lib/libgtest.a
_deps/highway-build/tests/copy_test: _deps/highway-build/CMakeFiles/copy_test.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --bold --progress-dir=/Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable tests/copy_test"
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/copy_test.dir/link.txt --verbose=$(VERBOSE)
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build && /opt/homebrew/Cellar/cmake/3.28.3/bin/cmake -D TEST_TARGET=copy_test -D TEST_EXECUTABLE=/Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build/tests/copy_test -D TEST_EXECUTOR= -D TEST_WORKING_DIR=/Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build -D TEST_EXTRA_ARGS= -D TEST_PROPERTIES= -D TEST_PREFIX= -D TEST_SUFFIX= -D TEST_FILTER= -D NO_PRETTY_TYPES=FALSE -D NO_PRETTY_VALUES=FALSE -D TEST_LIST=copy_test_TESTS -D CTEST_FILE=/Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build/copy_test[1]_tests.cmake -D TEST_DISCOVERY_TIMEOUT=60 -D TEST_XML_OUTPUT_DIR= -P /opt/homebrew/Cellar/cmake/3.28.3/share/cmake/Modules/GoogleTestAddTests.cmake

# Rule to build all files generated by this target.
_deps/highway-build/CMakeFiles/copy_test.dir/build: _deps/highway-build/tests/copy_test
.PHONY : _deps/highway-build/CMakeFiles/copy_test.dir/build

_deps/highway-build/CMakeFiles/copy_test.dir/clean:
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build && $(CMAKE_COMMAND) -P CMakeFiles/copy_test.dir/cmake_clean.cmake
.PHONY : _deps/highway-build/CMakeFiles/copy_test.dir/clean

_deps/highway-build/CMakeFiles/copy_test.dir/depend:
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-src /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/highway-build/CMakeFiles/copy_test.dir/DependInfo.cmake "--color=$(COLOR)"
.PHONY : _deps/highway-build/CMakeFiles/copy_test.dir/depend

