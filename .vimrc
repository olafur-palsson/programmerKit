set nocompatible " be iMproved, required filetype off " required

set rtp+=~/.vim/bundle/Vundle.vim 
call vundle#begin() 
Plugin 'VundleVim/Vundle.vim'
"Plugin 'neovim/vimball.vim'

" NerdTree filetree thing 
Plugin 'scrooloose/nerdtree'

" Fugitive is a GIT thing 
Plugin 'tpope/vim-fugitive' 
Plugin 'git://git.wincent.com/command-t.git' 
Plugin 'rstacruz/sparkup', {'rtp': 'vim/'}

" Line numbers, mjög krúsjal 
Plugin 'myusuf3/numbers.vim'

" Java
Plugin 'rustushki/JavaImp.vim'

" Python
Plugin 'vim-python/python-syntax'

" C/C++
Plugin 'derekwyatt/vim-fswitch'

" Syntax Support 
Plugin 'octol/vim-cpp-enhanced-highlight' 
Plugin 'pangloss/vim-javascript' 
Plugin 'vim-scripts/cSyntaxAfter'
Plugin 'xolox/vim-misc'
Plugin 'oepn/vim-easytags'
Plugin 'mattn/emmet-vim'

" Fuzzy search 
Plugin 'kien/ctrlp.vim'

" Syntax Checker 
Plugin 'scrooloose/syntastic'

" Airline 
Plugin 'bling/vim-airline'

" Autocomplete 
Plugin 'dansomething/vim-eclim'

" To make Custom UI 
Plugin 'shougo/unite.vim'

" Auto-complete
Plugin 'Valloric/YouCompleteMe'

" Added braces support
Plugin 'tpope/vim-surround'

" Color scheme
Plugin 'sickill/vim-monokai'

" All of your Plugins must be added before the following line 
" 
" PLUGIN END HERE, ENTER CONFIG 
" 
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

" Color sceme 
"colorscheme monokai 
highlight NonText ctermbg=none 
highlight Normal ctermbg=none

" Python syntax highlighting
let g:python_highlight_all = 1

" SET TAB WIDTH TO 2 
set shiftwidth=2 
set tabstop=2

" SET NERDTREE PLUGIN SHORTCUT 
nmap <F6> :NERDTreeToggle<CR>

" KEYMAPS 
nnoremap <F3> NumbersToggle<CR> 
nnoremap <F4> NumbersOnOff<CR> 
nnoremap <CR> G

" JS Syntax setup let g:javascript_conceal_function = "ƒ" 
let g:javascript_conceal_null = "ø" 
let g:javascript_conceal_this = "@" 
let g:javascript_conceal_return = "⇚" 
let g:javascript_conceal_undefined = "¿" 
let g:javascript_conceal_NaN = "ℕ" 
let g:javascript_conceal_prototype = "¶" 
let g:javascript_conceal_static = "•" 
let g:javascript_conceal_super = "Ω" 
let g:javascript_conceal_arrow_function = "⇒"

augroup javascript_folding
	au!
	au FileType javascript setlocal foldmethod=syntax 
augroup END

" FuzzySearch <C-p> ignore regex 
let g:ctrlp_custom_ignore = 'node_modules\|DS_Store\|git'

" C++11 suppert for syntastic 
let g:syntastic_cpp_compiler = 'clang++' 
let g:syntastic_cpp_compiler_options = ' -std=c++11 -stdlib=libc++'

""""""""""""""""" " " AIRLINE SETUP " """""""""""""""""

let g:airline_powerline_fonts = 1

if !exists('g:airline_symbols')
	let g:airline_symbols = {} 
endif

" unicode symbols 
let g:airline_left_sep = '»' 
let g:airline_left_sep = '▶' 
let g:airline_right_sep = '«' 
let g:airline_right_sep = '◀' 
let g:airline_symbols.linenr = '␊' 
let g:airline_symbols.linenr = '␤' 
let g:airline_symbols.linenr = '¶' 
let g:airline_symbols.branch = '⎇' 
let g:airline_symbols.paste = 'ρ' 
let g:airline_symbols.paste = 'Þ' 
let g:airline_symbols.paste = '∥' 
let g:airline_symbols.whitespace = 'Ξ'

" airline symbols 
let g:airline_left_sep = '' 
let g:airline_left_alt_sep = '' 
let g:airline_right_sep = '' 
let g:airline_right_alt_sep = '' 
let g:airline_symbols.branch = '' 
let g:airline_symbols.readonly = '' 
let g:airline_symbols.linenr = ''

" Enable the things 
let g:airline_powerline_fonts = 1
let fold = 1

" Enable code folding 
set foldmethod=indent 
set foldnestmax=10 
set nofoldenable 
set foldlevel=2

" Edit .vimrc hotkey on <F12> 
nnoremap <F12> :vsp ~/.vimrc<CR>
nnoremap <F12><F12> :vsp ~/.vimrc<CR>:so %<CR> :q<CR>

" Javaimp Project Folders if needed many then append ',' to the string
let g:JavaImpPaths =
    \ $HOME . "/projects/search/API" 

" CSyntaxAfter 
autocmd! FileType c,cpp,java,php call CSyntaxAfter()

" Autoreload the .vimrc on change
augroup myvimrc
    au!
    au BufWritePost .vimrc,_vimrc,vimrc,.gvimrc,_gvimrc,gvimrc so $MYVIMRC | if has('gui_running') | so $MYGVIMRC | endif
augroup END



""""""""""""""""""""""""""""""
"
"       SPEED TYPING
"
""""""""""""""""""""""""""""""
imap sysout System.out.println(

nnoremap <C-h> :FSAbove<CR> 


