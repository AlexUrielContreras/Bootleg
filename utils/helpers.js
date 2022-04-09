module.exports = {
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    format_date: (date) => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
            date
        ).getFullYear()}`;
    },
    setvar:(varName, varValue, options)=>{
      options.data.root[varName] = varValue;
    },
    equalto:(var1,var2)=>{
      if (var1==var2){
        return true
      }else{
        return false
      }
    },
    concat:(str1,str2)=>{
      return str1.concat(str2)
    },
    BufferToImg:(buffer)=>{
      return 'data:image/png;base64,' + Buffer.from(buffer).toString('base64')
    }
};