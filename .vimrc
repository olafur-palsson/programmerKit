
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


" ---------------------
"        THEME
" ---------------------

" Color scheme
syntax on
colorscheme sublimemonokai

" No background color
highlight NonText ctermbg=none 
highlight Normal ctermbg=none


" ---------------------
"     TAB SETTINGS
" ---------------------

set expandtab
set shiftwidth=2 
set softtabstop=2

" Set quit and restore functions

" --------------------
"       KEYMAPS 
" --------------------

" ---- NORMAL MODE -----

" prev tab; next tab; new tab 
nnoremap <F2> :tabp <CR>
nnoremap <F3> :tabn <CR>
nnoremap <F4> :tabe <CR>

" reload vimrc; reload buffer
nnoremap <F12><F12> :so ~/.vimrc<CR>
nnoremap <F5><F5> :edit! <CR>

" nerd tree toggle; save; nerd tree enter -> open in new tab
nnoremap <F6> :NERDTreeToggle <CR>
nnoremap <c-s> :w <CR>
let NERDTreeMapOpenInTab='<CR>'

" ---- INSERT MODE ----

" expand braces/parens/brackets 
inoremap (<CR> (<CR>)<C-c>O
inoremap (, (<CR>),<C-c>O
inoremap {<CR> {<CR>}<C-c>O
inoremap {, {<CR>},<C-c>O
inoremap [<CR> [<CR>]<C-c>O
inoremap [, [<CR>],<C-c>O


" --------------------
"        MISC 
" --------------------

" FuzzySearch <C-p> ignore regex 
let g:ctrlp_custom_ignore = 'node_modules\|DS_Store\|git'

" Enable code folding 
set foldmethod=indent 
set foldnestmax=10 
set nofoldenable 
set foldlevel=2

