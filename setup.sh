#!/bin/bash

# 学术课题组网站安装脚本
# 用于快速设置和部署 Hugo 网站

set -e

echo "🚀 学术课题组网站安装脚本"
echo "================================"

# 检查操作系统
OS="$(uname -s)"
case "${OS}" in
    Linux*)     MACHINE=Linux;;
    Darwin*)    MACHINE=Mac;;
    CYGWIN*)    MACHINE=Cygwin;;
    MINGW*)     MACHINE=MinGw;;
    *)          MACHINE="UNKNOWN:${OS}"
esac

echo "检测到操作系统: ${MACHINE}"

# 检查是否安装了 Hugo
check_hugo() {
    if command -v hugo &> /dev/null; then
        HUGO_VERSION=$(hugo version | grep -oE 'v[0-9]+\.[0-9]+\.[0-9]+' | head -1)
        echo "✅ Hugo 已安装: ${HUGO_VERSION}"
        return 0
    else
        echo "❌ Hugo 未安装"
        return 1
    fi
}

# 安装 Hugo
install_hugo() {
    echo "📦 正在安装 Hugo..."
    
    case "${MACHINE}" in
        Mac)
            if command -v brew &> /dev/null; then
                brew install hugo
            else
                echo "请先安装 Homebrew: https://brew.sh/"
                exit 1
            fi
            ;;
        Linux)
            # 尝试使用包管理器安装
            if command -v apt-get &> /dev/null; then
                sudo apt-get update
                sudo apt-get install -y hugo
            elif command -v yum &> /dev/null; then
                sudo yum install -y hugo
            elif command -v snap &> /dev/null; then
                sudo snap install hugo
            else
                echo "请手动安装 Hugo: https://gohugo.io/installation/"
                exit 1
            fi
            ;;
        *)
            echo "请手动安装 Hugo: https://gohugo.io/installation/"
            exit 1
            ;;
    esac
}

# 检查是否安装了 Git
check_git() {
    if command -v git &> /dev/null; then
        echo "✅ Git 已安装"
        return 0
    else
        echo "❌ Git 未安装，请先安装 Git"
        exit 1
    fi
}

# 初始化 Git 仓库
init_git() {
    if [ ! -d ".git" ]; then
        echo "📝 初始化 Git 仓库..."
        git init
        git add .
        git commit -m "Initial commit: Academic website setup"
        echo "✅ Git 仓库初始化完成"
    else
        echo "✅ Git 仓库已存在"
    fi
}

# 创建示例图片占位符
create_placeholders() {
    echo "🖼️  创建图片占位符..."
    
    # 创建成员头像占位符
    mkdir -p static/images/members
    
    # 使用 ImageMagick 创建占位符图片（如果可用）
    if command -v convert &> /dev/null; then
        convert -size 400x400 xc:lightgray -gravity center -pointsize 24 -annotate +0+0 "张伟" static/images/members/zhang-wei.jpg
        convert -size 400x400 xc:lightblue -gravity center -pointsize 24 -annotate +0+0 "李明" static/images/members/li-ming.jpg
        convert -size 400x400 xc:lightgreen -gravity center -pointsize 24 -annotate +0+0 "王丽" static/images/members/wang-li.jpg
        echo "✅ 成员头像占位符创建完成"
    else
        echo "⚠️  ImageMagick 未安装，请手动添加成员头像到 static/images/members/ 目录"
    fi
}

# 测试网站
test_site() {
    echo "🧪 测试网站..."
    
    # 构建网站
    if hugo --quiet; then
        echo "✅ 网站构建成功"
    else
        echo "❌ 网站构建失败"
        exit 1
    fi
    
    # 启动开发服务器（后台运行）
    echo "🌐 启动开发服务器..."
    hugo server --bind 0.0.0.0 --port 1313 --quiet &
    SERVER_PID=$!
    
    # 等待服务器启动
    sleep 3
    
    # 检查服务器是否运行
    if curl -s http://localhost:1313 > /dev/null; then
        echo "✅ 开发服务器运行正常"
        echo "🎉 网站可在 http://localhost:1313 访问"
    else
        echo "❌ 开发服务器启动失败"
    fi
    
    # 停止服务器
    kill $SERVER_PID 2>/dev/null || true
}

# 显示下一步操作
show_next_steps() {
    echo ""
    echo "🎉 安装完成！"
    echo "================================"
    echo ""
    echo "下一步操作："
    echo "1. 启动开发服务器："
    echo "   hugo server"
    echo ""
    echo "2. 在浏览器中访问："
    echo "   http://localhost:1313"
    echo ""
    echo "3. 编辑内容："
    echo "   - 成员信息: content/members/"
    echo "   - 论文信息: content/publications/"
    echo "   - 网站配置: config.yaml"
    echo ""
    echo "4. 部署到 GitHub Pages："
    echo "   - 创建 GitHub 仓库"
    echo "   - 推送代码到仓库"
    echo "   - 在仓库设置中启用 GitHub Pages"
    echo ""
    echo "📚 更多信息请查看 README.md"
}

# 主函数
main() {
    echo "开始安装..."
    
    # 检查依赖
    check_git
    
    if ! check_hugo; then
        read -p "是否要安装 Hugo? (y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            install_hugo
        else
            echo "请手动安装 Hugo 后重新运行此脚本"
            exit 1
        fi
    fi
    
    # 初始化项目
    init_git
    create_placeholders
    
    # 测试网站
    read -p "是否要测试网站? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        test_site
    fi
    
    show_next_steps
}

# 运行主函数
main "$@"
