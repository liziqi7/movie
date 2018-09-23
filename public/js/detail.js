$(function() {
    // 处理删除电影数据的逻辑
    $(".comment").click(function(e) {
        var target = $(this);
        var tid = target.data('tid');
        var cid = target.data('cid');
        if ($("#js-tid").length > 0) {
            $('#js-tid').val(tid)
        } else {
            $("<input>").attr({
                type: "hidden",
                name: 'comment[tid]',
                id: "js-tid",
                value: tid
            }).appendTo("#commentForm");
        }
        if ($("#js-cid").length > 0) {
            $('#js-cid').val(cid)
        } else {
            $("<input>").attr({
                type: "hidden",
                name: 'comment[cid]',
                id: "js-cid",
                value: cid
            }).appendTo("#commentForm");
        }

    })
})