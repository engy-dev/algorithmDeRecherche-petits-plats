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
        '.dropdown-content.show': {
          transform: "translateY(0%)",
          transition: "transform ease-out 300ms",
        },
        '.dropbtn.show img': {
          transform: "rotateZ(180deg)",
        },

        /* Hide scrollbar for Chrome, Safari and Opera */
        '.dropdown-content::-webkit-scrollbar': {
          display: "none",
        },
        '.serachContainer': {
          paddingBottom: "9px",
        },
        '.searchItemsContainer': {
          display: "flex",
          minHeight: "36px",
          width: "168px",
          borderRadius: "2px",
          border: "1px solid #c6c6c6",
          margin: "0 auto",
          paddingLeft: '8px',
          paddingRight: "11px",
        },
        '.dropdownSearch': {
          color: "#7A7A7A",
          fontFamily: "Manrope",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: "400",
          lineHeight: "normal",
          width: "100%",
        },
        '.dropdownSearch:focus': {
          outline: 'none',
        },
        '.dropListButtonSelected': {
          backgroundColor: "#FFD15B",
          marginRight: "10px",
          padding: "17px 18px",
          display: "flex",
          columnGap: "60px",
          borderRadius: "11px",
          alignItems: "center",
        },
        '.dropdown-content ul li': {
          color: "#1b1b1b",
          fontFamily: "Manrope",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "normal",
          padding: "6.5px 16px",
          display: "flex",
          justifyContent: "space-between",
        },
        '#ingredients-list li:first-letter, #appliances-list li:first-letter, #ustensils-list li:first-letter': {
          textTransform: "uppercase",
        },
        '#ingredients-list li:hover, #appliances-list li:hover, #ustensils-list li:hover': {
          backgroundColor: "#FFD15B",
        },
        '.dropdown-content ul li.validate': {
          backgroundColor: "#FFD15B",
          fontWeight: "700",
        },
        '.recipesContainer': {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          margin: "0 auto",
          paddingTop: " 34px",
          paddingBottom: "170px",
          width: "fit-content",
          columnGap: "48px",
          rowGap: "66px",
        },
        '.recipeCard': {
          display: "flex",
          flexDirection: "column",
          height: "731px",
          width: "380px",
          backgroundColor: "white",
          borderRadius: "21px",
          position: "relative",
          boxShadow: "0px 4px 34px 30px rgba(0, 0, 0, 0.04)",
        },
        '.recipeImage': {
          height: "253px",
          width: "380px",
          objectFit: "cover",
          borderTopLeftRadius: "21px",
          borderTopRightRadius: "21px",
        },
        '.recipeTime': {
          borderRadius: "14px",
          paddingLeft: "15px",
          paddingRight: "15px",
          paddingTop: "5px",
          paddingBottom: "5px",
          backgroundColor: "#ffd15b",
          width: "fit-content",
          fontFamily: "Manrope",
          fontSize: "12px",
          fontWeight: "400",
          color: "#1b1b1b",
          position: "absolute",
          top: "21px",
          right: "22px",
        },
        '.recipeName': {
          color: "black",
          fontFamily: "Anton",
          fontWeight: "400",
          fontSize: "18px",
          padding: "32px 0 0 25px",
        },
        '.recipeContent': {
          padding: "29px 25px 61px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        },
        '.recipeTitle': {
          color: "#7A7A7A",
          fontFamily: "Manrope",
          fontWeight: "700",
          fontSize: "12px",
          letterSpacing: "1.08px",
          textTransform: "uppercase",
        },
        '.recipeContentDescription': {
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        },
        '.recipeDescription': {
          color: "#1b1b1b",
          fontFamily: "Manrope",
          fontWeight: "400",
          fontSize: "14px",
          height: "76px",
          lineHeight: "normal",
          overflow: " hidden",
        },
        '.recipeContentIngredients': {
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        },
        '.listIngredients': {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr 1fr 1fr",
          rowGap: "21px",
        },
        '.ingredient': {
          height: "39px",
          lineHeight: "1",
        },
        '.ingredientName': {
          color: "#1b1b1b",
          fontFamily: "Manrope",
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "normal",
        },
        '.ingredientQuantity': {
          color: "#7a7a7a",
          fontFamily: "Manrope",
          fontWeight: "400",
          fontSize: "14px",
          lineHeight: "normal",
        },
      });
    },
  ],
}

