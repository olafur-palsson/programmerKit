set nocompatible                " be iMproved, required
filetype off                  " required


set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
Plugin 'VundleVim/Vundle.vim'

" NerdTree filetree thing
Plugin 'scrooloose/nerdtree'

" Fugitive is a GIT thing
Plugin 'tpope/vim-fugitive'
Plugin 'git://git.wincent.com/command-t.git'
Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}

" Line numbers, mjög krúsjal
Plugin 'myusuf3/numbers.vim'

" Monokai 
Plugin 'sickill/monokai'


" Syntax Support
Plugin 'octol/vim-cpp-enhanced-highlight'
Plugin 'pangloss/vim-javascript'

" Fuzzy search
Plugin 'kien/ctrlp.vim'

" Syntax Checker
Plugin 'scrooloose/syntastic'

" Airline
Plugin 'bling/vim-airline'

" Motion with FuzzyFinder
Plugin 'easymotion/vim-easymotion'

" To make Custom UI
Plugin 'shougo/unite.vim'

" All of your Plugins must be added before the following line
"						
"									PLUGIN END HERE, ENTER CONFIG	" 
"



call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" 
"

"Put your non-Plugin stuff after this line
" 


" SET TAB WIDTH TO 2 
set shiftwidth=2
set tabstop=2

" SET NERDTREE PLUGIN SHORTCUT 
nmap <F6> :NERDTreeToggle<CR>

" KEYMAPS 
nnoremap <F3> NumbersToggle<CR>
nnoremap <F4> NumbersOnOff<CR>
nnoremap <CR> G

" JS Syntax setup
let g:javascript_conceal_function             = "ƒ"
let g:javascript_conceal_null                 = "ø"
let g:javascript_conceal_this                 = "@"
let g:javascript_conceal_return               = "⇚"
let g:javascript_conceal_undefined            = "¿"
let g:javascript_conceal_NaN                  = "ℕ"
let g:javascript_conceal_prototype            = "¶"
let g:javascript_conceal_static               = "•"
let g:javascript_conceal_super                = "Ω"
let g:javascript_conceal_arrow_function       = "⇒"

augroup javascript_folding
   au!
   au FileType javascript setlocal foldmethod=syntax
augroup END

" FuzzySearch <C-p> ignore regex
let g:ctrlp_custom_ignore = 'node_modules\|DS_Store\|git'
