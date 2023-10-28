function getTextColor(bgColor: string) {
    // Преобразуем цвет фона в [R, G, B] формат
    var rgb = hexToRgb(bgColor);

    if (!rgb) return '#900';

    // Вычисляем яркость фона по формуле
    var brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

    // Если яркость фона меньше или равна 128, то возвращаем белый цвет текста,
    // иначе возвращаем черный цвет текста.
    return brightness <= 128 ? '#ffffff' : '#000000';
}

function hexToRgb(hex: string) {
    // Извлекаем значения R, G и B из цветного шестнадцатеричного кода
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

export default getTextColor;
