var tokens = new Array();
var tokenIndex = 0;
var errorCount = 0;
var currentToken = "";
var EOF = new TokenObject();
EOF.Token = "$";
EOF.Type = "EOF";

/*****PARSERVARIBLES**/
var START_SYMBOL = 'S';





var token_traducer = new TokenObject();
// varible global para el code traducido
var traducerCode = "";
var FinalInput = "";
/*******
 *      MAIN
 ******/
/*
La funcion init es la funcion principal que interactú con todos los demas
*/
function init() {
    //print("..........start-traducir..........");
    //print(lex());
    tokens = tokenSorter();
    ListToken();
    //------parser--program

}

/*
Esta funcion toma la entrada del codigo y nos devuelve el codigo identificando
el tipo de caracter como char,int,op,(),{}
*/

function lex() {
    var sourceCode = document.getElementById("Main_Code").value;
    var inCharList = false;
    var inComment = false;
    var inComment2 = false;
    var firstQuote = 0;
    var sourceCodeNoWhiteSpace = new Array();
    souceCode = trim(sourceCode);

    for (var i = 0; i < sourceCode.length; ++i) {
        if (i == (sourceCode.length - 1)) {
            firstQuote = sourceCode.length;
        }
        // sets flag when the lexer enters a character list
        if (sourceCode[i] == "\"") {
            inCharList = true;
        }
        //sets flag when lexer enters a one-line commet
        if (sourceCode[i] == "/" && sourceCode[i + 1] == "/") {
            inComment = true;
        }
        //sets flag when lexer enters a multi-line comment
        if (sourceCode[i] == "/" && sourceCode[i + 1] == "*") {
            inComment2 = true;
        }

        //if IncharList flag is true, do not ignore white space
        while (inCharList == true) {
            if (sourceCode[i] != "\n") {
                sourceCodeNoWhiteSpace += sourceCode[i];
            }
            i++;
            if (sourceCode[i] == "\"") {
                inCharList = false;
            }
        }
        //IF the inComment (one-line comemnt) flag is true ignore everything on that line
        while (inComment == true) {
            i += 1;
            if (sourceCode[i] == "\n") {
                inComment = false;
            }
        }
        //if the inComment2 (multi-line comment) is true ignore averything until the en of comment syntax
        while (inComment2 == true) {
            if (i == (sourceCode.length - 1)) {
                break;
            }
            i += 1;
            if (sourceCode[i] == "*" && sourceCode[i + 1] == "/") {
                i += 2;
                inComment2 = false;
            }
        }
        //ignore white space in every other situation
        if (sourceCode[i] != " " && sourceCode[i] != "\n") {
            sourceCodeNoWhiteSpace += sourceCode[i];
        }
    } //end for
    // print -> output ->texarea
    return sourceCodeNoWhiteSpace;
}



/***********
 *          TOKEN OBJECT
 ************/
/Este es un objeto que contiene el tipo y el token de los caacteres/
function TokenObject() {
    this.Token = "";
    this.Type = "";
}

/*********
 *    SORTER FUNCTION
 *********/

//TOKEN SORTER FUNCTION - stes the token object type.
/Esta funcion adjunta el caracter con el token/
function tokenSorter() {
    tokenArray = lex();
    
    //console.log(tokenArray);

    sortedTokenArray = new Array();
    typeArray = new Array();

    var currtoken = 0;
    for (currtoken = 0; currtoken < tokenArray.length; currtoken++) {

        var newtoken = new TokenObject();
        newtoken.Token = tokenArray[currtoken];
        newtoken.Type = tipo_token(currtoken);

        //console.log( newtoken.Token + " --------->"+  newtoken.Type);

        sortedTokenArray[currtoken] = newtoken;

    }
    //var res = tipo_token(23);
    //console.log(res);
    return sortedTokenArray;
}


// DEVULEVE el tipo de cada token que necontremosListToken
function tipo_token(i) {
    if (tokenArray[i] == "0" || tokenArray[i] == "1" || tokenArray[i] == "2" || tokenArray[i] == "3" ||
        tokenArray[i] == "4" || tokenArray[i] == "5" || tokenArray[i] == "6" || tokenArray[i] == "7" ||
        tokenArray[i] == "8" || tokenArray[i] == "9") {
        return "digit";
    }

    if (tokenArray[i] == "a" || tokenArray[i] == "b" || tokenArray[i] == "c" || tokenArray[i] == "d" ||
        tokenArray[i] == "e" || tokenArray[i] == "f" || tokenArray[i] == "g" || tokenArray[i] == "h" ||
        tokenArray[i] == "i" || tokenArray[i] == "j" || tokenArray[i] == "k" || tokenArray[i] == "l" ||
        tokenArray[i] == "m" || tokenArray[i] == "n" || tokenArray[i] == "o" || tokenArray[i] == "p" ||
        tokenArray[i] == "q" || tokenArray[i] == "r" || tokenArray[i] == "s" || tokenArray[i] == "t" ||
        tokenArray[i] == "u" || tokenArray[i] == "v" || tokenArray[i] == "w" || tokenArray[i] == "x" ||
        tokenArray[i] == "y" || tokenArray[i] == "z" || tokenArray[i] == "A" || tokenArray[i] == "B" ||
        tokenArray[i] == "C" || tokenArray[i] == "D" || tokenArray[i] == "E" || tokenArray[i] == "F" ||
        tokenArray[i] == "G" || tokenArray[i] == "H" || tokenArray[i] == "I" || tokenArray[i] == "J" ||
        tokenArray[i] == "K" || tokenArray[i] == "L" || tokenArray[i] == "M" || tokenArray[i] == "N" ||
        tokenArray[i] == "O" || tokenArray[i] == "P" || tokenArray[i] == "Q" || tokenArray[i] == "R" ||
        tokenArray[i] == "S" || tokenArray[i] == "T" || tokenArray[i] == "U" || tokenArray[i] == "V" ||
        tokenArray[i] == "W" || tokenArray[i] == "X" || tokenArray[i] == "Y" || tokenArray[i] == "Z") {
        return "char";
    }

    if (tokenArray[i] == "+" || tokenArray[i] == "-") {
        return "op";
    }

    if (tokenArray[i] + tokenArray[i + 1] + tokenArray[i + 2] == "-90" || tokenArray[i] + tokenArray[i + 1] == "90") {
        return "NUM";
    }

    if (tokenArray[i] == ";") {
        return "semicolon";
    }

    if (tokenArray[i] == "{") {
        return "leftCurlyBracket";
    }

    if (tokenArray[i] == "}") {
        return "rightCurlyBracket";
    }

    if (tokenArray[i] == "[") {
        return "leftCurlyBracket";
    }

    if (tokenArray[i] == "]") {
        return "rightCurlyBracket";
    }
    if (tokenArray[i] == "(") {
        return "leftDelim";
    }

    if (tokenArray[i] == ")") {
        return "rightdelim";
    }

    if (tokenArray[i] == "=") {
        return "assign";
    }
    if (tokenArray[i] + tokenArray[i + 1] == "==") {
        return "assign2";
    }

    if (tokenArray[i] == "\"") {
        return "quote";
    }

    if (tokenArray[i] == " ") {
        return "space";
    }
    if (tokenArray[i] == ":") {
        return "points";
    } else {
        //print("Error!! caracter no valido: " + tokenArray[i]);
        //console.log("Caracter no valido");
    }
}

/********
 *   GET->NEXTTOken
 *******/
// Devuelve el objeto siguiente
function getNextToken() {
    var thisToken = EOF;
    if (tokenIndex < tokens.length) {
        thisToken = tokens[tokenIndex];
        //     console.log("current token: " + thisToken.Token);
    }
    tokenIndex++;
    return thisToken;
}

/********
 *    Peek->at->Token
 ********/

function peekAtToken(peekNumber) {
    var thatToken = EOF;
    if (tokenIndex < tokens.length) {
        thatToken = tokens[tokenIndex + peekNumber];
    }
    return thatToken;
}

/********
 *      produciones
 ********/
/******
 *  se hace el analisis de la entrada
 *  consumiendo caacter a caaracter y fomar los token fianales
 * que al final lo devuelve en una arreglo
 * ****/
function finalTokens() {
    rpt = new Array();

    var endloop = tokens.length;
    var temp = "";
    var i = 0;
    var index = 0;

    function add(token, type, t_token) {
        var newtoken = new TokenObject();
        newtoken.Token = token;
        newtoken.Type = type;
        rpt[index] = newtoken;

        var t_newtoken = new TokenObject();
        t_newtoken.Token = t_token;
        t_newtoken.Type = type;
        token_traducer[index] = t_newtoken;
        index++;
    }

    function BEGverEND() {
        console.log(getNextToken());
    }
    var linea = 0;



    /*ciclo para el análisis de la entada
     */
    while (temp != "END" && tokens[i]) {
        //BEGverEND();
        temp += tokens[i].Token;
        /**************
                        DETECTAR  INT
         ***************/
        if (temp == "int") {
            //console.log("detect-> int");
            temp = "";
            add("int", "RESERVED", "y");
            var secuense = "";
            var variable = "";
            var j = i + 1;
            while (secuense != "=") {
                secuense = tokens[j].Token;
                variable += secuense;
                j++;
            }
            //console.log("variable : " + variable.substring(0, variable.length - 1));
            add(variable.substring(0, variable.length - 1), "ID", "v");
            var jump = variable.substring(0, variable.length - 1).length;
            i += jump;
        }

        else if (temp == "{" || temp=="*") {
                temp += tokens[i].Token;
            while(temp =="}" || temp=="*"){
                temp += tokens[i].Token;
            }
            
            //console.log("detect-> BEGIN and linea = " + linea);
            temp = "";
            add("{ / *", "SEPARADOR", "{ / *");
        }



        /**************
                    DETECTAR ARRAY
         ***************/
        else if (temp == "array") {
            
            //console.log("detect-> BEGIN and linea = " + linea);
            temp = "";
            add("array", "ARRAY", "a");
        }
        /*****************************/
        else if (temp == "downto") {

          

            //console.log("detect-> fordware");
            temp = "";
            add("downto", "DOWNTO", "dw");
        }
        /*****************************/
        else if (temp == "function") {
            //console.log("detect-> 90");
            temp = "";
            add("function", "FUNCTION", "f");
        }
        /*****************************/
        else if (temp == "of") {
            //console.log("detect-> -90");
            temp = "";
            add("of", "OF", "o");
        }
        /*****************************/
        else if (temp == "repeat") {
            //console.log("detect-> SUM");
            temp = "";
            add("repeat", "REPEAT", "r");
        }
        /*****************************/
        else if (temp == "until") {
            //console.log("detect-> RES");
            temp = "";
            add("until", "UNTIL", "u");
        }
        /*****************************/
        else if (temp == "begin") {
            //console.log("detect-> rigth");
            temp = "";
            add("begin", "Begin", "b");
        }
        /*****************************/
        else if (temp == "else") {
            //console.log("detect-> left");
            temp = "";
            add("else", "ELSE", "e");
        }
        /*****************************/
        else if (temp == "goto") {
            //console.log("detect-> FOR");
            temp = "";
            add("goto", "GOTO", "g");

        }

        /*************************************/

         else if (temp == "packed") {
            //console.log("detect-> FOR");
            temp = "";
            add("packed", "PACKED", "p");

        }

        /*******************************/

          else if (temp == "set") {
            //console.log("detect-> FOR");
            temp = "";
            add("set", "SET", "s");

        }


        /*****************************************/

          else if (temp == "var") {
            //console.log("detect-> FOR");
            temp = "";
            add("var", "VAR", "v");

        }

        /*************************************/

          else if (temp == "case") {
            //console.log("detect-> FOR");
            temp = "";
            add("case", "CASE", "c");

        }

        /**************************************************/

          else if (temp == "end") {
            //console.log("detect-> FOR");
            temp = "";
            add("end", "END", "e");

        }

        /*****************************************************/

          else if (temp == "if") {
            //console.log("detect-> FOR");
            temp = "";
            add("if", "IF", "i");

        }

        /**************************************************************************/

          else if (temp == "procedure") {
            //console.log("detect-> FOR");
            temp = "";
            add("procedure", "PROCEDURE", "p");

        }

        /***********************************************/

          else if (temp == "then") {
            //console.log("detect-> FOR");
            temp = "";
            add("then", "THEN", "t");

        }

        /************************************/


          else if (temp == "while") {
            //console.log("detect-> FOR");
            temp = "";
            add("while", "WHILE", "w");

        }
        /***********************************************/

          else if (temp == "const") {
            //console.log("detect-> FOR");
            temp = "";
            add("const", "CONST", "c");

        }
        /***********************************************/

          else if (temp == "file") {
            //console.log("detect-> FOR");
            temp = "";
            add("file", "FILE", "f");

        }
        /***********************************************/

          else if (temp == "label") {
            //console.log("detect-> FOR");
            temp = "";
            add("label", "LABEL", "l");

        }
        /***********************************************/

          else if (temp == "program") {
            //console.log("detect-> FOR");
            temp = "";
            add("program", "PROGRAM", "p");

        }
        /***********************************************/

          else if (temp == "to") {
            //console.log("detect-> FOR");
            temp = "";
            add("to", "TO", "t");

        }
        /***********************************************/

          else if (temp == "with") {
            //console.log("detect-> FOR");
            temp = "";
            add("with", "WHIT", "w");

        }
        /***********************************************/

          else if (temp == "do") {
            //console.log(tokens[i+1].Token);
            if(tokens[i+1].Token != "w"){

            temp = "";
            add("do", "DO", "d");
        }

        }
        /***********************************************/

          else if (temp == "for") {
            //console.log("detect-> FOR");
            temp = "";
            add("for", "FOR", "f");

        }
        /***********************************************/

          else if (temp == "nil") {
            //console.log("detect-> FOR");
            temp = "";
            add("nil", "NIL", "n");

        }
        /***********************************************/

          else if (temp == "record") {
            //console.log("detect-> FOR");

            temp = "";
            add("record", "RECORD", "r");

        }
        /***********************************************/

          else if (temp == "type") {
            //console.log("detect-> FOR");
            temp = "";
            add("type", "TYPE", "t");

        


        } else if (temp == ",") {
            //console.log("detect-> )");
            temp = "";
            add(",", "DELIM", ",");
        }

        else if (temp == ";") {
            //console.log("detect-> {");
            temp = "";
            add(";", "DELIM", ";");
        } else if (temp == ":"  &&  tokens[i+1].Token != "=") {


            //console.log(tokens[i+1].Token);

            //temp = tokens[i+3].Token;

            //console.log(temp);

            temp="";
            add(":", "DELIM", ":");
        }

        //*************** */
        else if (temp == "[") {
            //console.log("detect-> {");
            temp = "";
            add("[", "DELIM", "[");
        } else if (temp == "]") {
            //console.log("detect-> }");
            temp = "";
            add("]", "DELIM", "]");
        }
        //**************** */
        else if (temp == "(") {
            //console.log("detect-> if");
            temp = "";
            add("(", "DELIM", "(");

        }
        else if (temp == ")") {
            //console.log("detect-> if");
            temp = "";
            add(")", "DELIM", ")");

        }
        else if (temp == ".") {
            //console.log("detect-> if");
            temp = "";
            add(".", "DELIM", ".");

        }
        //-----------------------------------------------------------------
        

        else if (temp == "=" ) {
           
            temp = "";
            add("=", "OP_IGUAL", "=");

        }

        else if (temp == "+" ) {
            //console.log("detect-> ==");
            temp = "";
            add("+", "OP_SUM", "+");

        }

         else if (temp == "-" ) {
            //console.log("detect-> ==");
            temp = "";
            add("-", "OP_RES", "-");

        }
        else if (temp == "*" ) {
            //console.log("detect-> ==");


            temp = "";
            add("*", "OP_MUL", "*");

        }

        else if (temp == "/" ) {
            //console.log("detect-> ==");

            
            temp = "";
            add("/", "OP_DIV", "/");

        }


        else if (temp == ":=" ) {
            //console.log(tokens[i+1].Token);
            

            temp = "";


            add(":=", "OP_DOSPUNTOS_IGUAL", ":=");
        }

        else if (temp == "=") {
            //console.log("detect-> ==");
            temp = "";
            add("=", "OP_IGUAL", "=");

        } 

        else if (temp == "<>") {
            //console.log("detect-> ==");
            temp = "";
            add("<>", "MAYORMENOR", "<>");

        } 

        else if (temp == "<" &&  tokens[i+1].Token != ">" &&  tokens[i+1].Token != "=") {
            //console.log("detect-> ==");
            temp = "";
            add("<", "OP_MENOR", "<");

        } 

        else if (temp == "<=") {
            //console.log("detect-> ==");
            temp = "";
            add("<=", "OP_MENORIGUAL", "<=");

        } 

        else if (temp == ">=") {
            //console.log("detect-> ==");
            temp = "";
            add(">=", "OP_MAYORIGUAL", ">=");

        }
        else if (temp == ">" &&  tokens[i+1].Token != "=") {
            //console.log("detect-> ==");
            temp = "";
            add(">", "OP_MAYOR", ">");

        }
         else if (temp == "^") {
            //console.log("detect-> ==");
            temp = "";
            add("^", "OP_POTEN", "^");

        }    

         else if (temp == "and") {
            //console.log("detect-> ==");
            temp = "";
            add("and", "OP_AND", "and");

        }  

         else if (temp == "or") {
            //console.log("detect-> ==");
            temp = "";
            add("or", "OP_OR", "or");

        }  

         else if (temp == "not") {
            //console.log("detect-> ==");
            temp = "";
            add("not", "OP_NOT", "not");

        }  

         else if (temp == "div") {
            //console.log("detect-> ==");
            temp = "";
            add("div", "OP_DIV", "div");

        }  

         else if (temp == "mod") {
            //console.log("detect-> ==");
            temp = "";
            add("mod", "OP_MOD", "mod");

        }  

         else if (temp == "in") {
            //console.log("detect-> ==");
            temp = "";
            add("in", "OP_IN", "in");

        }  



        else if (temp == ";") {
            // console.log("detect-> ;");
            temp = "";
            add(";", "ENDLINE", ";");

        } else if (temp == "END") {
            //console.log("detect-> end");
            var newtoken = new TokenObject();
            newtoken.Token = "END";
            newtoken.Type = "RESERVED";
            rpt[index] = newtoken;
           // print("SIN ERRORES");
        }
        //     console.log(temp)
        i++;
    }
    return rpt;
}
/*
funcion pa verificar si es una variable de tipo estero o no
*/

function IsNumber(numero) {
    if (Number.isInteger(numero)) {
        //console.log('La variable es entera');
        return true;
    }
    return false;
}
/*
mostrar la lista de token que se obtuvieron
al ejecuta el programa
*/
/**********************
 * pass my source code to traduce a real instruction
 * 
 * *********************/
function ListToken() {
  var FinalInput = "";
    //print("\n ListToken\n");
    ToKens = new Array();
    ToKens = finalTokens();
    var compiler = "";



    for (var i = 0; i < ToKens.length; i++) {
        console.log(i + " -> " + ToKens[i].Token + " -> " + ToKens[i].Type);
        //console.log(i + "t " + token_traducer[i].Token + " -> " + token_traducer[i].Type);
        //print(i + " " + ToKens[i].Token + " -> " + ToKens[i].Type);
        //traducerCode += token_traducer[i].Token;
    }
    //print("SourceCode->: " + traducerCode);
    var text = traducerCode;
    //document.getElementById('plane').innerHTML = FinalInput;
    //document.getElementById('plane2').innerHTML = FinalInput;
   // document.getElementById('msg').innerHTML = text;
    //console.log("[[[[[[[  "+text+" ]]]]]]]]]");
    //console.log(startUp(grammar, text));
    //traducerCode = "";
    //console.log("FINALINPUT-> ", FinalInput);
}