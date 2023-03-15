import { useAppTheme } from "../Context/AppTheme";
import { colors } from "../Util";
const useDynamicColors = () => {

    const theme = useAppTheme();
    const dynamicColors = {
        BACKGROUND: "#121212",
        FONT: "#FFFFFF",
    }
    if (theme === "dark") {
        dynamicColors.BACKGROUND = colors.dark;
        dynamicColors.FONT = colors.light;
    }
    if (theme === "light") {
        dynamicColors.BACKGROUND = colors.light;
        dynamicColors.FONT = colors.dark;
    }
    return {
        background: {
            backgroundColor: dynamicColors.BACKGROUND
        },
        font: {
            color: dynamicColors.FONT
        }
    }

}

export default useDynamicColors;