/**
 * Created by ayudhien on 11/1/16.
 */

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

$( document ).ready(function() {

    $('.sampleContainer').hide();

    $('#search').click(function(e){
        $('.sampleContainer').show();
        $('#result').hide();
        var url = $('#url').val();
        $.post("/getinfo", {url : url}, function(data, status){
            $('.sampleContainer').hide();
            $('#result').show();

            $('#youtube-title').html(data.fulltitle);
            $('#description').html(data.description);
            var title =data.title;

            $.each(data.formats, function(k, v){
                if (typeof v.resolution != 'undefined') {

                    var info = v.format.split(' - ')[1];
                    var dl_url = '<li class="list-group-item">';
                    dl_url += ' <em>' + info +'</em> ';
                    dl_url += '<span class="pull-right">';
                    dl_url +='<a href="/download/' + data.id + '/'+v.format_id+'?title='+title.replaceAll(' ', '_')+'&ext='+v.ext+'">'
                    dl_url += 'Download ' + v.ext;
                    dl_url += ' <i class="glyphicon glyphicon-download"></i>'
                    dl_url += '</a>';
                    dl_url +='</span>';
                    dl_url += '</li>';
                    $('#youtube-format').append(dl_url);
                }
            })
        });
    });
});