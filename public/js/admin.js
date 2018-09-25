$(function() {
    // 处理删除电影数据的逻辑
    $(".del").click(function(e) {
        var target = $(e.target);
        var id = target.data('id');
        var tr = $(".item-id-" + id);
        $.ajax({
            type: 'DELETE', // 异步请求类型：删除
            url: '/admin/movie/list?id=' + id
        }).done(function(res) {
            if (res.success === 1) {
                if (tr.length > 0) {
                    tr.remove();
                }
            }
        })

    })
    $('#douban').blur(function() {

        var id = $(this).val();
        $.ajax({
            url: 'http://api.douban.com/v2/movie/subject/' + id,            
            cache: true,
            type: 'get',
            dataType: 'jsonp',
            crossDomain: true,
            jsonp: 'callbak',
            data:{
                alt:'xd',
                apikey:'0df993c66c0c636e29ecbb5344252a4a'
            },
            success: function(data) {
                $("inputTitle").val(data.title);
                $("inputDoctor").val(data.directors[0].namme);
                $("inputCountry").val(data.countries[0]);
                $("inputPoster").val(data.images.small);
                $("inputYear").val(data.year);
                $("inputSummary").val(data.summary);
            },
            error:function(data){
            }
        })
    })

})