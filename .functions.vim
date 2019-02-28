
fu! SaveSess()
  execute 'call mkdir(%:p:h/.vim)'
  execute 'mksession! %:p:h/.vim/session.vim'
endfunction

fu! RestoreSess()
  if filereadable('%:p:h/.vim/session.vim') == 'false'
    return 'true'
  endif
  execute 'so %:p:h/.vim/session.vim'
  if bufexists(1)
    for l in range(1, bufnr('$'))
      if bufwinnr(l) == -1
        exec 'sbuffer ' . l
      endif
    endfor
  endif
endfunction

function! QuitAll()
  execute 'call SaveSess'
  execute 'qa'
endfunction

command! Q call QuitAll()

autocmd VimLeave * call SaveSess()
autocmd VimEnter * call RestoreSess()
