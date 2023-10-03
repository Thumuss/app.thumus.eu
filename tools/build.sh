index="src/index.ts"
name="cli-thumus-app"
builddir="./build"
mkdir build
rm $builddir/$name
bun build $index --compile --outfile $builddir/$name
# && upx -1 --lzma --overlay=skip $builddir/$name-tmp -o $builddir/$name # Doesn't work, but bun is very large so we want to compress it