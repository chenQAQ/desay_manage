import Mock from 'mockjs'
//获取拼图房间信息
//get
Mock.mock('/api/puzzle/check?guid=11101&room_id=123456',function () {
  const random=1
  if(random){
    return {
      userdata:{
        headpic_url:'https://thirdwx.qlogo.cn/mmopen/vi_32/aicg70BU0IJicIdj1KGpPVIhllnmIC8TNJfMhX8xcTI51GJpaNXzy8Gq0drHpibBV3QsWOibkmUYicLd6TZ24bIdtwA/132',
        name:'张学友',
        guid:'11112'
      }
    }
  }else{
    return {
      code:0
    }
  }

});


Mock.setup({
    timeout: '200-600'
})
