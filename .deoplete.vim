
" Enable deoplete

set completeopt+=noinsert,noselect
set completeopt-=preview

hi Pmenu    gui=NONE    guifg=#c5c8c6 guibg=#373b41
hi PmenuSel gui=reverse guifg=#c5c8c6 guibg=#373b41
let g:deoplete#enable_at_startup = 1

filetype plugin indent on

" deoplete tab-complete
inoremap <expr><tab> pumvisible() ? "\<c-n>" : "\<tab>"
" tern
autocmd FileType javascript nnoremap <silent> <buffer> gb :TernDef<CR>

""  let g:deoplete#omni#input_patters = {}
""endif
""autocmd InsertLeave,CompleteDone * if pumvisible() == 0 | pclose | endif
  let g:clang_library_path='/usr/lib/llvm-6.0/lib/libclang.so.1'
