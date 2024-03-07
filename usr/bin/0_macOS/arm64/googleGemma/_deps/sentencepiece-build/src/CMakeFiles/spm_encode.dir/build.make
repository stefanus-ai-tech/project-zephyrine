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
include _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/compiler_depend.make

# Include the progress variables for this target.
include _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/progress.make

# Include the compile flags for this target's objects.
include _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/flags.make

_deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/spm_encode_main.cc.o: _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/flags.make
_deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/spm_encode_main.cc.o: _deps/sentencepiece-src/src/spm_encode_main.cc
_deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/spm_encode_main.cc.o: _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --progress-dir=/Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/spm_encode_main.cc.o"
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/sentencepiece-build/src && /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/spm_encode_main.cc.o -MF CMakeFiles/spm_encode.dir/spm_encode_main.cc.o.d -o CMakeFiles/spm_encode.dir/spm_encode_main.cc.o -c /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/sentencepiece-src/src/spm_encode_main.cc

_deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/spm_encode_main.cc.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Preprocessing CXX source to CMakeFiles/spm_encode.dir/spm_encode_main.cc.i"
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/sentencepiece-build/src && /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/sentencepiece-src/src/spm_encode_main.cc > CMakeFiles/spm_encode.dir/spm_encode_main.cc.i

_deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/spm_encode_main.cc.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green "Compiling CXX source to assembly CMakeFiles/spm_encode.dir/spm_encode_main.cc.s"
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/sentencepiece-build/src && /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/sentencepiece-src/src/spm_encode_main.cc -o CMakeFiles/spm_encode.dir/spm_encode_main.cc.s

# Object files for target spm_encode
spm_encode_OBJECTS = \
"CMakeFiles/spm_encode.dir/spm_encode_main.cc.o"

# External object files for target spm_encode
spm_encode_EXTERNAL_OBJECTS =

_deps/sentencepiece-build/src/spm_encode: _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/spm_encode_main.cc.o
_deps/sentencepiece-build/src/spm_encode: _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/build.make
_deps/sentencepiece-build/src/spm_encode: _deps/sentencepiece-build/src/libsentencepiece.0.0.0.dylib
_deps/sentencepiece-build/src/spm_encode: _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color "--switch=$(COLOR)" --green --bold --progress-dir=/Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable spm_encode"
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/sentencepiece-build/src && $(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/spm_encode.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
_deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/build: _deps/sentencepiece-build/src/spm_encode
.PHONY : _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/build

_deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/clean:
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/sentencepiece-build/src && $(CMAKE_COMMAND) -P CMakeFiles/spm_encode.dir/cmake_clean.cmake
.PHONY : _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/clean

_deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/depend:
	cd /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/sentencepiece-src/src /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/sentencepiece-build/src /Users/user/adelaide-zephyrine-charlotte-assistant/usr/vendor/gemma.cpp/build/_deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/DependInfo.cmake "--color=$(COLOR)"
.PHONY : _deps/sentencepiece-build/src/CMakeFiles/spm_encode.dir/depend

