index="src/index.ts"
name="cli-thumus-app"
builddir="./build"
mkdir -p build
[ -f "$builddir/$name" ] && rm $builddir/$name
[ -f "$builddir/$name-tmp" ] && rm $builddir/$name-tmp
bun build $index --compile --outfile $builddir/$name # -tmp && upx -1 --lzma --overlay=skip $builddir/$name-tmp -o $builddir/$name # Doesn't work, but bun is very large so we want to compress it