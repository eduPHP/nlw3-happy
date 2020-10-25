import {StyleSheet} from "react-native";
import {colors, fonts} from "../../util/styles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    uploadedImagesContainer: {
        flexDirection: 'row',
    },
    uploadedImage: {
        width: 64,
        height: 64,
        borderRadius: 20,
        marginBottom: 24,
        marginRight: 8
    },

    title: {
        color: colors.textBase,
        fontSize: 24,
        fontFamily: fonts.bold,
        marginBottom: 24,
        paddingBottom: 16,
        borderBottomWidth: 0.8,
        borderBottomColor: colors.line
    },

    label: {
        color: colors.textComplements,
        fontFamily: fonts.semibold,
        marginBottom: 8,
    },

    comment: {
        fontSize: 11,
        color: colors.textComplements,
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: colors.line,
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top',
    },

    imagesInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderStyle: 'dashed',
        borderColor: '#96d2f0',
        borderWidth: 1.4,
        borderRadius: 20,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
    },


    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16,
    },

    nextButton: {
        backgroundColor: colors.blue,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 16,
    },

    nextButtonText: {
        fontFamily: fonts.extrabold,
        fontSize: 16,
        color: '#FFF',
    }
})
