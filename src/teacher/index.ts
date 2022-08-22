import getClassList from "../components/getClassList";
import getClassData from "../components/getClassData";
import getTeacherData from "../components/getTeacherData";
import getUserData from "../auth/getUserData";
import $ from "jquery";

const main = async () => {
    const userData = await getUserData();
    if (!userData) {
        return;
    }
    const uid = userData.uid;

    // classListを変数に代入
    const classList = await getClassList(uid);
    if (!classList) {
        return;
    }

    // HTML 要素を取得
    const element = document.getElementById("class-list");
    if (!element) {
        return;
    }

    if (classList.length === 0) {
        $(".def").hide();
        $(".hide").show();
    }

    // クラス一覧の表示
    classList.forEach(async (value) => {
        // クラスデータを取得
        const classData = (await getClassData(value))!;

        // クラスを担当する講師名を取得
        const teacherDocument = (await getTeacherData(classData.teachers[0]))!;

        // 講師名を変数に代入
        const teacherName =
            teacherDocument.last_name + " " + teacherDocument.first_name;

        const tr = $("<tr>");
        const td = $("<td>", {
            text: classData.class_name,
        });
        const td2 = $("<td>", {
            class: "button",
        });
        $("<a>", {
            text: "詳細",
            href: `./class-information.html?class_name=${classData.class_name}`,
        }).appendTo(td2);
        td.appendTo(tr);
        $("<td>", {
            text:
                classData.teachers.length > 1
                    ? `${teacherName} 他${classData.teachers.length - 1}名`
                    : teacherName,
        }).appendTo(tr);
        td2.appendTo(tr);
        tr.appendTo(element);
    });
};

// /**
//  * クラスを削除する
//  * @param className クラス名
//  */
// const delClass = async (className: string) => {
//     // クラスデータを取得
//     const document = await getClassData(className);

//     if (!document) {
//         return;
//     }

//     // teachers/class/className の一致する class-name を削除する
//     document.teachers.forEach(async (teacherName) => {
//         await deleteDoc(doc(db, `users/${teacherName}/class/${className}`));
//     });

//     // classのclassNameのドキュメントを削除する関数
//     await deleteDoc(doc(db, `class/${className}`));
// };

// mainを実行
main();

$("#open").trigger("click");
