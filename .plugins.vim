
call plug#begin('~/.vim/plugged')

Plug 'VundleVim/Vundle.vim'
"Plug 'neovim/vimball.vim'

" Auto-close braces
Plug 'jiangmiao/auto-pairs'

" NerdTree filetree thing 
Plug 'scrooloose/nerdtree', { 'on': 'NerdTreeToggle' }

" Fugitive is a GIT thing 
Plug 'tpope/vim-fugitive' 
Plug 'git://git.wincent.com/command-t.git' 
Plug 'rstacruz/sparkup', {'rtp': 'vim/'}

" Line numbers, mjög krúsjal 
Plug 'myusuf3/numbers.vim'

" C/C++
Plug 'derekwyatt/vim-fswitch'

" Haskell
Plug 'neovimhaskell/haskell-vim'

" Javascript
Plug 'carlitux/deoplete-ternjs', { 'do': 'npm install -g tern' }

" Java
Plug 'rustushki/JavaImp.vim'

" Python
Plug 'vim-python/python-syntax'
Plug 'zchee/deoplete-jedi'


" Color Scheme
Plug 'ErichDonGubler/vim-sublime-monokai'

" Syntax Support 
Plug 'octol/vim-cpp-enhanced-highlight' 
Plug 'pangloss/vim-javascript' 
Plug 'vim-scripts/cSyntaxAfter'
Plug 'xolox/vim-misc'
Plug 'oepn/vim-easytags'
Plug 'mattn/emmet-vim'

" Fuzzy search 
Plug 'kien/ctrlp.vim'

" Airline 
Plug 'bling/vim-airline'

" Autocomplete 
Plug 'Shougo/deoplete.nvim', { 'do': ':UpdateRemotePlugins' }
Plug 'Rip-Rip/clang_complete'

" To make Custom UI 
Plug 'shougo/unite.vim'


" Added braces support
Plug 'tpope/vim-surround'

" Color scheme
Plug 'sickill/vim-monokai'



" All of your Plugins must be added before the following line 
" 
" PLUGIN END HERE, ENTER CONFIG 
" 
"




call plug#end()            " required
"
