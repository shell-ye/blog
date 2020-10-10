export const getStrCount = (scrstr,armstr) => { //scrstr 源字符串 armstr 特殊字符
    let count=0;
    while(scrstr.indexOf(armstr) != -1 ) {
       scrstr = scrstr.replace(armstr,"")
       count++;    
    }
    return count;
}

export const addArticleRoute = ( article_list ) => {
    
}