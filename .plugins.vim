
call plug#begin('~/.vim/plugged')


Plug 'VundleVim/Vundle.vim'

" NerdTree filetree thing 
Plug 'scrooloose/nerdtree'

" Fast comments
Plug 'scrooloose/nerdcommenter'

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
Plug 'roxma/nvim-yarp'
Plug 'roxma/vim-hug-neovim-rpc'
Plug 'artur-shaik/vim-javacomplete2', { 'for': 'java' }

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

" More tpope because he is best
Plug 'tpope/vim-repeat'

" Color scheme
Plug 'sickill/vim-monokai'



" All of your Plugins must be added before the following line 
" 
" PLUGIN END HERE, ENTER CONFIG 
" 
"




call plug#end()            " required
"
