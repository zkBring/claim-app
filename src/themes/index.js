import { defineApplicationConfig } from 'helpers'
const config = defineApplicationConfig()

const themes = {
  dark: {},

  light: {
    primaryTextColor: config.primaryTextColor, // main ccolor of text
    secondaryTextColor: config.secondaryTextColor, // secondary color of text
    additionalTextColor: config.additionalTextColor, // secondary color of text
    extraTextColor: '#6A6A6A', // secondary color of text
    disabledTextColor: '#DFE0EB', // disabled color of text
    dangerTextColor: '#FF2C2C', // danger color of text
    noteTextColor: '#D4CCFF', // note color of text
    primaryBorderColor: '#E4E4E4',
    secondaryBorderColor: '#000',
    additionalBorderColor: '#272727',
    primaryColor: config.backgroundColor, // main color of bg
    secondaryColor: '#F7F8FA', // secondary coplor of bg
    blankColor: '#FFF', // secondary coplor of bg
    menuItemActive: '#3E4049',
    primaryHighlightColor: config.highlightColor,
    loaderPrimaryColor: '#000',
    widgetColor: '#FFF',
    loadingBackgroundColor: 'linear-gradient(to right, #00B2FF 0%, #FA00FF 50%, #00B2FF 100%)',
    

    
    loaderColor: config.highlightColor,
    linkColor: config.highlightColor,


    // buttons
    buttonActionBackgroundColor: config.highlightColor,
    buttonActionBackgroundHoverColor: config.highlightHoverColor,
    buttonActionBackgroundActiveColor: config.highlightActiveColor,

    buttonDisabledBackgroundColor: '#E4E4E4',

    buttonDefaultBackgroundColor: 'transparent',
    buttonDefaultBackgroundHoverColor: 'transparent',
    buttonDefaultBackgroundActiveColor: 'transparent',
    buttonDefaultBorderHoverColor: '#121212',
    buttonDefaultBorderActiveColor: '#121212',
    buttonDefaultDisabledBorderColor: '#E4E4E4',
    buttonDefaultDisabledTextColor: '#9D9D9D',

    buttonAdditionalBackgroundColor: '#E4EDFF',
    buttonAdditionalBackgroundHoverColor: '#E4EDFF',
    buttonAdditionalTextHoverColor: config.highlightHoverColor,
    buttonAdditionalBackgroundActiveColor: '#E4EDFF',
    buttonAdditionalTextActiveColor: config.highlightActiveColor,

    buttonGradient: 'linear-gradient(to right, #00B2FF 0%, #FA00FF 50%, #00B2FF 100%)',
    


    tagDefaultColor: '#DFE0EB',
    tagErrorColor: '#FF2C2C',
    tagInfoColor: '#2B32EA',
    tagSuccessColor: '#21F142',

    noteDefaultBgColor: '#E4EDFF',
    noteDefaultTextColor: config.highlightColor,
    noteAttentionBgColor: '#272727',
    noteAttentionTextColor: '#C3C3C3',

    inputHoverBorderColor: '#121212',
    inputDisabledBackgroundColor: '#E4E4E4',

    ethereumLogoColor: '#0EBDCD',
    polygonLogoColor: '#0EBDCD',
    toastBackgroundColor: '#2D2A3D',
  }
}

export default themes