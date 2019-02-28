" File              : /home/bitchhunter3000/.vimrc
" Author            : Your Name <your@mail>
" Date              : 07.10.2018
" Last Modified Date: 07.10.2018
" Last Modified By  : Olafur Palsson (github: olafur-palsson) <olafur.palsson2@gmail.com>
" File              : /home/bitchhunter3000/.vimrc
" Date              : 07.10.2018
" Last Modified Date: 07.10.2018
set nocompatible " be iMproved, required filetype off " required

filetype plugin on

" Plugins list is always first
source ~/.plugins.vim
source ~/.python.vim
source ~/.c-cpp.vim
source ~/.haskell.vim
source ~/.airline.vim
source ~/.deoplete.vim
source ~/.functions.vim

" Color sceme 
syntax on
colorscheme sublimemonokai

highlight NonText ctermbg=none 
highlight Normal ctermbg=none


" SET TAB WIDTH TO 2 
set expandtab
set shiftwidth=2 
set softtabstop=2

" Set quit and restore functions

" SET NERDTREE PLUGIN SHORTCUT 
let NERDTreeMapOpenInTab='<CR>'

" KEYMAPS 

nnoremap <F2> :tabp <CR>
nnoremap <F3> :tabn <CR>
nnoremap <F4> :tabe <CR>
" Edit .vimrc hotkey on <F12> 
nnoremap <F12> :vsp ~/.vimrc<CR>
nnoremap <F12><F12> :so ~/.vimrc<CR>
nnoremap <F5> :edit <CR>

nmap <F6> :NERDTreeToggle <CR>

nnoremap <c-s> :w <CR>

inoremap (<CR> (<CR>)<C-c>O
inoremap (, (<CR>),<C-c>O
inoremap {<CR> {<CR>}<C-c>O
inoremap {, {<CR>},<C-c>O
inoremap [<CR> [<CR>]<C-c>O
inoremap [, [<CR>],<C-c>O

" FuzzySearch <C-p> ignore regex 
let g:ctrlp_custom_ignore = 'node_modules\|DS_Store\|git'

" Enable code folding 
set foldmethod=indent 
set foldnestmax=10 
set nofoldenable 
set foldlevel=2



" Javaimp Project Folders if needed many then append ',' to the string
let g:JavaImpPaths =
    \ $HOME . "/projects/search/API" 
