#!/bin/bash

# 检查是否存在 dist 文件夹、manifest.json 文件和 ui.html 文件
if [ ! -d "dist" ]; then
    echo "Error: dist 文件夹不存在"
    exit 1
fi

if [ ! -f "manifest.json" ]; then
    echo "Error: manifest.json 文件不存在"
    exit 1
fi

if [ ! -f "ui.html" ]; then
    echo "Error: ui.html 文件不存在"
    exit 1
fi

# 创建一个临时目录用于存放待压缩的文件
temp_dir=$(mktemp -d)

# 将 dist 文件夹和 manifest.json 文件、ui.html 文件复制到临时目录中
cp -r dist "$temp_dir"
cp manifest.json ui.html "$temp_dir"

# 进入临时目录
cd "$temp_dir" || exit 1

# 将文件压缩为 plugin.zip
zip -r plugin.zip ./*


# 将压缩好的 plugin.zip 移动到当前路径下
mv plugin.zip ../plugin.zip

# 获取 plugin.zip 的绝对路径
plugin_zip_path=$(realpath "../plugin.zip")

# 返回到原始路径
cd -

echo "压缩完成: plugin.zip 已经复制到当前路径"
echo "plugin.zip 的路径: $plugin_zip_path"
cp $plugin_zip_path .
