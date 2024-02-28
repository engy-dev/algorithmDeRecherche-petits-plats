/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**/*.{html,js}"],
    theme: {
      extend: {
        colors: {
          lightgrey: '#f5f5f5',
          grey_p7: '7a7a7a',
          yellow_p7: '#ffd15b',
          black_p7: '#1b1b1b',
        },
        fontSize: {
          xl: ['44px', {
            lineHeight: '66px',
            fontWeight: '400',
          }],
        },
        fontFamily: {
          primaryFont: ["Anton", "ui-sans-serif"],
          secondaryFont: ["Manrope", "ui-sans-serif"],
        },
        backgroundImage: {
          'backgroundPetitsPlats': "url('../../assets/images/backgroundImage.png')",
        },
        borderRadius: {
          borderRadius10: "10px",
          borderRadius11: "11px",
        },
      },
    },
    plugins: [
      function ({ addComponents }) {
        addComponents({
          '.dropdownDivContainer': {
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
            maxHeight: "315px",
            width: "195px",
            overflow: "hidden",
          },
          '.dropdownTagContainer': {
            display: "flex",
          },
          '.dropbtn': {
            display: "flex",
            backgroundColor: "white",
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingTop: "17px",
            paddingBottom: "17px",
            borderRadius: "11px",
            columnGap: "63px",
            color: "#1b1b1b",
            fontFamily: "Manrope",
            fontWeight: "500",
            fontSize: "16px",
            alignItems: "center",
            zIndex: "2",
          },
          '.dropdown-content': {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            color: "#7a7a7a",
            fontFamily: "Manrope",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "normal",
            height: "315px",
            width: "100%",
            zIndex: "1",
            overflow: "scroll",
            transform: "translateY(-100%)",
            transformOrigin: "top",
            borderBottomLeftRadius: "11px",
            borderBottomRightRadius: "11px",
            /* Hide scrollbar for IE, Edge and Firefox */
            msOverflowStyle: "none", /* IE and Edge */
            scrollbarWidth: "none",  /* Firefox */
          },
          