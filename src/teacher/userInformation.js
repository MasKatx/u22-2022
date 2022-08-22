import getUserData from "../auth/getUserData";
import getTeacherData from "../components/getTeacherData";

/**
 * ユーザ情報参照画面のjs
 */
const main = async () => {
    const userData = await getUserData();
    if (!userData) {
        return;
    }

    // useridを変数に代入
    const uid = userData.uid;

    // stuDataを変数に代入
    const teacherData = await getTeacherData(uid);

    // ユーザ情報のドキュメントを取り出して変数に代入
    const firstName = teacherData.first_name;
    const lastName = teacherData.last_name;
    const firstNameKana = teacherData.first_name_kana;
    const lastNameKana = teacherData.last_name_kana;
    const sexNum = teacherData.sex;

    //デフォルトでは性別無し
    let sex = "";

    // "sex"の番号によって性別を判定
    if (sexNum == "1") {
        sex = "男";
    } else {
        sex = "女";
    }

    const mail = teacherData.mail;
    const birthday = teacherData.birth_date.split("-");

    // 年、月、日をbirthdayから切り出して変数に代入
    const year = birthday[0];
    const month = birthday[1];
    const day = birthday[2];

    const tel = teacherData.tel;

    // HTML要素を取得し、ユーザ情報を表示
    document.getElementById("first_name").innerHTML = firstName;
    document.getElementById("last_name").innerHTML = lastName;
    document.getElementById("first_name_kana").innerHTML = firstNameKana;
    document.getElementById("last_name_kana").innerHTML = lastNameKana;
    document.getElementById("sex").innerHTML = sex;
    document.getElementById("mail").innerHTML = mail;
    document.getElementById("birth_date").innerHTML =
        year + "/" + month + "/" + day;
    document.getElementById("tel").innerHTML = tel;
};

main();
