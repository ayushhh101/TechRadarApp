import { StyleSheet} from 'react-native'

const style=StyleSheet.create(
{
body:{
    margin:5,
},
    view1 :{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    img1: {
            //flex:1,
            height:40,
            width:40,
            //resizeMode: 'contain',
            borderRadius:25,
            marginRight:7
        },
    clgName:
    {
        flex:1,
        color:'#F8F8F8',
        fontSize:18,
        letterSpacing:1.2,
        fontWeight:500,
    },

    timeLeft:{
        backgroundColor:'#B51028',
        padding:5,
        margin:5,
        borderRadius:5,
        fontSize:15,
        color:'white'
    },

    contName:{
    color:'#F8F8F8',
    fontSize:35,
    letterSpacing:2,
    fontWeight:600,
    margin:3,
    textAlign:'center'
    },

    normal:{
     color:'#F8F8F8',
     fontSize:18,
     letterSpacing:1.2,
     fontWeight:300,
     margin:1
    },

    free:{
        color:'#00AF00',
        fontWeight:600
    },
    seats:
    {
      color:'red',
      fontWeight:600
    },
    reg:{
        backgroundColor:'#F8F8F8',
        color:'#0A192C',
        textAlign:'center',
        padding:7,
         fontSize:23,
         letterSpacing:1,
          fontWeight:600,
          margin:15,
          marginBottom:10,
        marginHorizontal:110,
        borderRadius:20
    },
    heading:{
    margin:1,
    marginLeft:10,
     color:'#0A192C',
        fontSize:35,
        letterSpacing:2,
        fontWeight:600
    },
    bgs :{
        backgroundColor:'#0A192C',
        padding:8,
        margin:5,
        marginTop:2,
        borderColor: 'white',
        borderRadius:10
    },
});
export default style;