$(document).ready(function() {

    $.ajax({
        url: 'https://quangbuiminh.com/api/products',
        type: 'GET',

    }).done(function(res) {
        console.log(res)
        let datas = res.data;
        let table = document.getElementById("table ");
        let html = '';

        if (datas.length == 0) {
            html +=
                '<tr><th colspan="9" style="text-align: center">Không có kết quả phù hợp</th></tr>';
            table.innerHTML = html;
            return;
        }

        for (let i = 0; i < datas.length; i++) {
            html += '<tr id =' + datas[i].id + '>';
            html += '<th>' + datas[i].id + '</th>';
            html += '<th>' + datas[i].name + '</th>';
            html += '<th>' + (datas[i].description == null ? '' : datas[i].description) +
                '</th>';
            html += '<th>' + (datas[i].price == null ? '' : datas[i].price) + '</th>';
            html += '<th>' + datas[i].quantity + '</th>';
            html += '<th>' + (datas[i].product_site == null ? '' : datas[i].product_site) +
                '</th>';
            html += '<th>' + (datas[i].created_by == null ? '' : datas[i].created_by) + '</th>';
            html +=
                '<th><button type="button" class="btn btn-outline-success btnEdit" data-id = "' +
                datas[i].id + '">Chỉnh sửa</button></th>';
            html +=
                '<th><button type="button" class="btn btn-outline-danger btnDelete" data-id = "' +
                datas[i].id + '")">Xóa</button></th>';
            html += '</tr>';
        }
        table.innerHTML = html;

    });

    $("#SubminBtn").click(function() {
        var id = $("#id").val();
        var name = $("#name").val();
        var price = $("#price").val();
        var description = $("#description").val();
        var quantity = $("#quantity").val();
        var product_site = $("#product_site").val();
        var created_by = $("#created_by").val();

        $.post("https://quangbuiminh.com/api/products", {
            id: id,
            name: name,
            price: price,
            description: description,
            quantity: quantity,
            product_site: product_site,
            created_by: created_by
        }, function(response) {
            console.log(response)
            location.reload();

            // $("#response").html("<div class='alert alert -success'"+response.message+"</div>")
            // clearField();

        });

    });


    function clearField() {
        $("#id").val("");
        $("#name").val("");
        $("#price").val("");
        $("#description").val("");
        $("#quantity").val("");
        $("#product_site").val("");
        $("#created_by").val("");
    }



    $('#table').on('click', '.btnEdit', function() {
        var id = $(this).data("id")
        console.log(id);

        $.ajax({
            type: "get",
            url: "https://quangbuiminh.com/api/products/" + id,
            dataType: "json",
            success: function(res) {
                let data = res.data;
                $("#name1").val(data.name);
                $("#price2").val(data.price);
                $("#description3").val(data.description);
                $("#quantity1").val(data.quantity);
                $("#product_site1").val(data.product_site);
                $("#created_by1").val(data.created_by);
                $("#exampleEdit").modal('show');

            }
        });

        $("#editBtn").click(function() {
            var name = $("#name1").val();
            var price = $("#price2").val();
            var description = $("#description3").val();
            var quantity = $("#quantity1").val();
            var product_site = $("#product_site1").val();
            var created_by = $("#created_by1").val();

            $.post("https://quangbuiminh.com/api/products/" + id, {
                id: id,
                name: name,
                price: price,
                description: description,
                quantity: quantity,
                product_site: product_site,
                created_by: created_by
            }, function(response) {
                console.log(response)
                location.reload();

                // $("#response").html("<div class='alert alert -success'"+response.message+"</div>")
                // clearField();

            });
        });

    });

    $('#table').on('click', '.btnDelete', function() {
        var id = $(this).data("id");

        console.log(id);

        $.ajax({
            type: "Delete",
            url: "https://quangbuiminh.com/api/products/" + id,
            success: function(res) {
                console.log('success');

                $('#' + id).remove();

            },
            error: function(res) {
                console.log("fales");

            }
        });
    });

    $("#formSearch").on('click', '#btnSearch', function(event) {
        event.preventDefault();

        let value = $("#value").val();
        let field = $("#field").val();
        console.log(value);

        $.ajax({
            type: "Get",
            url: "https://quangbuiminh.com/api/products/search",
            data: {
                field: field,
                value: value
            },
            dataType: "Json",
            success: function(value) {
                let datas = value.data;
                let table = document.getElementById("table ");
                let html = '';



                for (let i = 0; i < datas.length; i++) {
                    html += '<tr id =' + datas[i].id + '>';
                    html += '<th>' + datas[i].id + '</th>';
                    html += '<th>' + datas[i].name + '</th>';
                    html += '<th>' + (datas[i].description == null ? '' : datas[i].description) +
                        '</th>';
                    html += '<th>' + (datas[i].price == null ? '' : datas[i].price) + '</th>';
                    html += '<th>' + datas[i].quantity + '</th>';
                    html += '<th>' + (datas[i].product_site == null ? '' : datas[i].product_site) +
                        '</th>';
                    html += '<th>' + (datas[i].created_by == null ? '' : datas[i].created_by) + '</th>';
                    html +=
                        '<th><button type="button" class="btn btn-outline-success btnEdit" data-id = "' +
                        datas[i].id + '">Chỉnh sửa</button></th>';
                    html +=
                        '<th><button type="button" class="btn btn-outline-danger btnDelete" data-id = "' +
                        datas[i].id + '")">Xóa</button></th>';
                    html += '</tr>';
                }
                table.innerHTML = html;
            }
        });
    });


});