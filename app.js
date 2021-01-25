let groups = []
let brands = []

function createFilter(columnNum) {
    let el = 'form tbody tr td:nth-child(' + columnNum + ')'
    let parentEl = 'form thead tr th:nth-child(' + columnNum + ')'
    let data = $(el)
    let res = []
    //console.log(el,data)
    for (let i = 0; i < data.length; i++) {
        //console.log($(data[i]).text())
        res[$(data[i]).text()] = ''
    }
    res = Object.keys(res).map((key, value) => {
        return key
    })
    let sel = $('<select>').appendTo($(parentEl)).attr('data-id', columnNum);
    sel.append($("<option>").attr('value', -1).text('---- все ----'))
    res.forEach((r, index) => sel.append($("<option>").attr('value', index).text(r)))
    sel.change(filter)
    return res
}

function createFilter1(columnNum) {
    let parentEl = 'form thead tr th:nth-child(' + columnNum + ')'
    $('<br>').appendTo($(parentEl))
    let input = $('<input>').appendTo($(parentEl)).attr('data-id', columnNum).css('width', '80%');
    $(input).on('input', filter)
    let button = $('<button>').appendTo($(parentEl)).attr('data-id', columnNum).text('X');
    button.click(function (event) {
        event.preventDefault()
        $(event.currentTarget).parent().children('input').val('')
        filter()
    })
}

function filter() {
    let selects = $('form thead select')
    let inputs = $('form thead input')
    let data = $('form tbody tr')
    let inputsData = [], selectsData = []
    for (let i = 0; i < selects.length; i++) {
        let id = $(selects[i]).attr('data-id')
        let value = $(selects[i]).val()
        let val = $(selects[i]).find(':selected').text()
        if (value != -1)
            selectsData.push({ id, val })
    }
    for (let i = 0; i < inputs.length; i++) {
        let id = $(inputs[i]).attr('data-id')
        let val = $(inputs[i]).val().trim()
        if (val)
            inputsData.push({ id, val })
    }
    for (let i = 0; i < data.length; i++) {
        let show = true
        selectsData.forEach((sel) => {
            if ($(data[i]).children('td:nth-child(' + sel.id + ')').text() != sel.val) show = false
        })
        inputsData.forEach((input) => {
            if ($(data[i]).children('td:nth-child(' + input.id + ')').text().toUpperCase().indexOf(input.val.toUpperCase()) == -1) show = false
        })
        if (show) {
            $(data[i]).show()
        } else {
            $(data[i]).hide()
        }
    }
    changeFilters()
}

function changeFilters() {
    let els = 'form tbody tr:visible'
    let data = $(els)
    let res1 = [], res2 = []
    //console.log(el,data)
    for (let i = 0; i < data.length; i++) {
        res1[$(data[i]).children('td:nth-child(1)').text()] = ''
        res2[$(data[i]).children('td:nth-child(2)').text()] = ''
    }
    res1 = Object.keys(res1).map((key, value) => {
        return key
    })
    res2 = Object.keys(res2).map((key, value) => {
        return key
    })
    let sel1 = $('form thead tr th:nth-child(1) select option')
    for(let i=1; i<sel1.length; i++){
        if(res1.includes($(sel1[i]).text())){
            $(sel1[i]).show()
        } else {
            $(sel1[i]).hide()
        }
    }
    let sel2 = $('form thead tr th:nth-child(2) select option')
    for(let i=1; i<sel2.length; i++){
        if(res2.includes($(sel2[i]).text())){
            $(sel2[i]).show()
        } else {
            $(sel2[i]).hide()
        }
    }
}

function createCart() {
    let parentEl = 'form thead tr th:nth-child(7)'
    $('<br>').appendTo($(parentEl))
    let button = $('<button>').appendTo($(parentEl)).text('Заказ');
    button.click(function (event) {
        event.preventDefault()
        $('form thead input').val('')
        $('form thead select').val(-1)

        let data = $('form tbody tr')
        for (let i = 0; i < data.length; i++) {
            let show = true
            if($(data[i]).children('td:nth-child(7)').has('input').length == 0) show = false
            if (show) {
                $(data[i]).show()
            } else {
                $(data[i]).hide()
            }
        }
    })
    let button1 = $('<button>').appendTo($(parentEl)).text('Все');
    button1.click(function (event) {
        event.preventDefault()
        $('form thead input').val('')
        $('form thead select').val(-1)
        filter()
    })
}

$(document).ready(function () {
    groups = createFilter(1)
    brands = createFilter(2)
    createFilter1(3)
    createFilter1(4)
    createCart()

    $('.j-buy').unbind()
    $(document).on('click', '.j-buy', function (event) {
        $(this).parent()
            .html('<input name="value[' + $(this).parent().parent().find('#Катномер').text() + ']" type="number" min="0" value="1" style="width:30px"/><button class="j-buy-delete">X</button>');
        event.stopPropagation()
    });
    $(document).on('click', '.j-buy-delete', function (event) {
        event.preventDefault()
        $(this).parent().html('<span class="j-buy">Купить</span>')
    });
});

