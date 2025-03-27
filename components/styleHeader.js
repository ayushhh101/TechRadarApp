import { StyleSheet} from 'react-native'

const style=StyleSheet.create(
{
    view1: {

        backgroundColor:'#0A192C',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'space-between',
                paddingVertical: 20,
                //paddingHorizontal: 25,
                paddingLeft:15

    },
    profilio:{
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    usernameText: {
        color: 'white', // Soft gray for contrast
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
    },
    text2:{
        color:'white',
        marginRight:10,
        fontSize:15
    },
    img1: {
        //flex:1,
        height:40,
        width:40,
        //resizeMode: 'contain',
        borderRadius:20,
        marginLeft:0
    },
    img2: {
            //flex:1,
            height:45,
            width:45,
            //resizeMode: 'contain',
            borderRadius:25,
            // marginRight:10
        },

    text1: {
        color:'#F8F8F8',
        fontSize:28,
        letterSpacing:2,
        fontWeight:500,
        flex:1,

        marginLeft:10
    },

    bg: {
        backgroundColor:'#0A192C',
        marginBottom:1
       },


});
export default style;