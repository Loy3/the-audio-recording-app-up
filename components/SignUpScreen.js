import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { auth } from './fbConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";

import topImgBG from "../assets/listen.png";
// import  from "../assets/bg.png";
import email from "../assets/email.png";
import pswd from "../assets/padlock.png";
import pswdhide from "../assets/hide.png";
import pswdshow from "../assets/view.png";

export default function SignUpScreen({ navigation }) {
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const [passwordVis, setPasswordVis] = useState(true);
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
    const [errorEmailMessage, setErrorEmailMessage] = useState("");
    const [passStatus, setPassStatus] = useState(false);
    const [emailStatus, setEmailStatus] = useState(false);

    const [btnStatus, setBtnStatus] = useState(true);
    const [btnEmStatus, setBtnEmStatus] = useState(false);
    const [btnPsStatus, setBtnPsStatus] = useState(false);
    const [btnBgColor, setBtnBgColor] = useState("whitesmoke");
    const [btnColor, setBtnColor] = useState("#808080");

    function onSignUp() {
        // console.log(emailAddress, password);
        createUserWithEmailAndPassword(auth, emailAddress, password).then(() => {
            // console.log("sign up sccessfully");
            // navigation.navigate("Journals");        
        }).catch((error) => {
            console.log(error.message);
        })
    }

    //Validation
    useEffect(() => {
        handleEmail(emailAddress)
    }, [emailAddress])

    useEffect(() => {
        handlePassword(password)
    }, [password])

    useEffect(() => {
        handleBtn()
    }, [handleBtn])

    function handleEmail(email) {

        let new_email = email;


        var emailAddress = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*/g;

        if (!new_email.match(emailAddress)) {
            setErrorEmailMessage("Enter a required email address");
            // console.log(email);
            setEmailStatus(true);
            setBtnEmStatus(false);
        } else {
            setErrorEmailMessage("");
            setEmailStatus(false);
            setEmailAddress(new_email);
            setBtnEmStatus(true);
        }
    }

    function handlePassword(pass) {
        let new_pass = pass;

        // regular expressions to validate password
        var lowerCase = /[a-z]/g;
        var upperCase = /[A-Z]/g;
        var numbers = /[0-9]/g;
        var specialChar = /[!@#$%^&*]/g;

        if (new_pass === "") {
            setErrorPasswordMessage("Password length should be more than 8.");
            setPassStatus(true);
            setBtnPsStatus(false);
        } else {

            if (!new_pass.match(lowerCase)) {
                setErrorPasswordMessage("Password should contains at least 1 or more lowercase letter(s)!");
                setPassStatus(true);
                setBtnPsStatus(false);
            } else if (!new_pass.match(upperCase)) {
                setErrorPasswordMessage("Password should contain at least 1 or more uppercase letter(s)!");
                setPassStatus(true);
                setBtnPsStatus(false);
            } else if (!new_pass.match(numbers)) {
                setErrorPasswordMessage("Password should contains numbers also!");
                setPassStatus(true);
                setBtnPsStatus(false);
            } else if (new_pass.length < 8) {
                setErrorPasswordMessage("Password length should be more than 8.");
                setPassStatus(true);
                setBtnPsStatus(false);
            } else if (!new_pass.match(specialChar)) {
                setErrorPasswordMessage("Password should contain at least 1 special character");
                setPassStatus(true);
                setBtnPsStatus(false);
            } else {
                setErrorPasswordMessage("Password is strong!");
                setPassStatus(false);
                setPassword(new_pass);
                setBtnPsStatus(true);
            }
        }
    }
    function handlePasswordVis() {
        if (passwordVis === true) {
            setPasswordVis(false);
        } else if (passwordVis === false) {
            setPasswordVis(true);
        }
    }

    function handleBtn() {
        // console.log(btnEmStatus, btnPsStatus);
        if (btnEmStatus === true && btnPsStatus === true) {
            setBtnStatus(false);
            setBtnBgColor("black");
            setBtnColor("white")
        } else {
            setBtnStatus(true);
            setBtnBgColor("whitesmoke");
            setBtnColor("#808080")
        }

    }
    //Validation

    return (
        <View style={styles.container}>
            <View style={styles.topImg} >
                <Image source={topImgBG} style={styles.signInImg} />
            </View>


            <View style={styles.formContainer}>
                <ScrollView scrollEnabled={true} >
                    <View style={styles.wrapper}>
                        <Text style={styles.signInTitle}>Sign Up.</Text>
                        <Text style={styles.signInSubTitle}>Sign Up to start a new journey of recordings.</Text>
                        <View style={styles.form_wrapper}>

                            <View style={styles.formCont}>
                                <View style={styles.avater}>
                                    <Image source={email} style={styles.avaterImg} />
                                </View>
                                <View style={styles.email}>
                                    <TextInput style={styles.formInput}
                                        autoComplete="off"
                                        autoCapitalize="none"
                                        onChangeText={text => setEmailAddress(text)}
                                        value={emailAddress} placeholder={"Email Address"} />
                                </View>
                            </View>
                            {emailStatus === true ?
                                <View style={{ margin: 10, marginTop: -10 }}>
                                    <Text style={{ fontStyle: "italic", fontSize: 12 }}>{errorEmailMessage}</Text>
                                </View>
                                : null}
                            <View style={styles.formCont}>
                                <View style={styles.avater}>
                                    <Image source={pswd} style={styles.avaterImg} />
                                </View>
                                <View style={styles.email}>
                                    <TextInput style={styles.formInput}
                                        secureTextEntry={passwordVis}
                                        autoComplete="off"
                                        autoCapitalize="none"
                                        onChangeText={text => setPassword(text)}
                                        value={password} placeholder={"Password"} />
                                </View>
                                <TouchableOpacity style={styles.pswEye} onPress={handlePasswordVis}>
                                    {passwordVis === true ? <Image source={pswdhide} style={styles.avaterImg} />
                                        : <Image source={pswdshow} style={styles.avaterImg} />}
                                </TouchableOpacity>
                            </View>
                            {passStatus === true ?
                                <View style={{ margin: 10, marginTop: -10 }}>
                                    <Text style={{ fontStyle: "italic", fontSize: 12 }}>{errorPasswordMessage}</Text>
                                </View>
                                : null}
                            <View style={styles.btnCon} >
                                <TouchableOpacity style={[styles.siBtn, { backgroundColor: btnBgColor }]} onPress={onSignUp} disabled={btnStatus}>
                                    <Text style={[styles.siBtnTxt, { color: btnColor }]}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.accountCont}>
                                <Text style={styles.accountTxt}>
                                    Already have an account?
                                </Text>
                                <TouchableOpacity style={styles.signUpCont}
                                    onPress={() => navigation.navigate("SignIn")}>
                                    <Text style={styles.signUpTxt}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                </ScrollView>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'whitesmoke',
        // alignItems: 'center',
        // justifyContent: 'center',
    },

    topImg: {
        width: "100%",
        height: "40%",
        // backgroundColor: "black",
        // position: "absolute",
        // top: 0,
        // flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "whitesmoke",
        marginTop: 10
        // top: 0,
        // left: 0
    },
    signInImg: {
        width: "95%",
        height: "94%",
        // marginHorizontal: "3%",
        // marginTop: 10
    },
    formContainer: {
        position: "absolute",
        top: "39%",
        backgroundColor: "white",
        width: "100%",
        height: "61%",
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,

    },
    signInTitle: {
        fontSize: 30,
        fontWeight: "bold",

    },
    signInSubTitle: {
        marginTop: 5,
        fontSize: 16
    },
    wrapper: {
        marginTop: 80,
        marginHorizontal: 30,
        marginBottom: 30

    },
    form_wrapper: {
        marginTop: 50
    },

    formCont: {
        flexDirection: 'row',
        width: "100%",
        backgroundColor: "whitesmoke",
        marginBottom: 20
    },
    email: {
        height: 50,
        width: "80%",
        margin: 5
    },

    avater: {
        width: 60,
        height: 60,
        backgroundColor: "whitesmoke",

    },
    avaterImg: {
        width: 30,
        height: 30,
        marginHorizontal: 15,
        marginVertical: 15
    },
    formInput: {
        width: "100%",
        height: "100%",
        // paddingVertical: 10,
        // backgroundColor: "black"
    },
    pswEye: {
        position: "absolute",
        right: 0
    },
    btnCon: {
        width: "100%",
        marginTop: 10
    },
    siBtn: {
        width: "100%",
        height: 60,
        borderRadius: 100,
        // marginVertical: 30,
        // marginHorizontal: "5%",
        backgroundColor: "black",
    },
    siBtnTxt: {
        textAlign: "center",
        color: "white",
        paddingVertical: 15,
        fontSize: 17,
        fontWeight: "bold"
    },
    accountCont: {
        marginTop: 30,
        // marginHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    // accountTxt: {
    //     marginLeft: 20
    // },
    signUpCont: {
        marginLeft: 5,
        color: "gray"
    },
});