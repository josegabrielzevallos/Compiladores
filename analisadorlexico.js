var tokens = new Array();
var tokenIndex = 0;
var errorCount = 0;
var currentToken = "";
var EOF = new TokenObject();
EOF.Token = "$";
EOF.Type = "EOF";

/*****PARSERVARIBLES**/
var START_SYMBOL = 'S';

/*
var grammar={

    1: 'S->P'
    2: 'P->i;BKM',
    3: 'M->bLe.',
    4: 'B->cC' ,
    5: 'B->ε' ,
    6: 'C->i=V;c',
    7: 'c->ε',
    8: 'V->n',
    9: 'V->r' ,
    10: 'V->s' ,
    11: 'K->vl' ,
    12: 'K->ε' ,
    13: 'l->D:T;j' ,
    14: 'j->ε' ,
    15: 'D->i'  ,
    16: 'D->i,d' ,
    17: 'T->R' ,
    18: 'T->I' ,
    19: 'T->S' ,
    20: 't->my'  ,
    21: 'y->m' ,
    22: 'm->F'  ,
    23: 'm->f'  ,
    24: 'm->A'  ,
    25: 'm->W'  ,
    26: 'm->w'  ,
    27: 'm->k;'  ,
    28: 'm->n;' ,
    29: 'F->oi#VOxzbte;' ,
    30: 'f->h(x)Hbte;gbte;' ,
    31: 'A->i#x;' ,
    32: 'x->Nx1' ,
    33: 'x->X1' ,
    34: '1->ZX1' ,
    35: '1->ε' ,
    36: 'X->u2' ,   
    37: '2->Ju2 ' ,
    38: '2->ε' ,
    39: 'u->M3' ,
    40: '3->+M3' ,
    41: '3->-M3' ,
    42: '3->ε',
    43: 'M->GQ' ,
    44: 'Q->*GQ' ,
    45: 'Q->/GQ' ,
    46: 'Q->^GQ' ,
    47: 'Q->%GQ' ,
    48: 'Q->ε',
    49: 'G->i' ,
    50: 'G->V' ,
    51: 'G->(x)' ,
    52: '9->=' ,
    53: '9->8' ,
    54: '9-><' ,
    55: '9->7' ,
    56: '9->6' ,
    57: '9->>' ,
    58: 'Z->5',
    59: 'Z->4',
    60: 'W->{(V);' ,
    61: 'W->{(V,V);' ,
    62: 'W->{(V,V,V);' ,
    63: 'w->w(x);',
    64: 'O->?' ,
    65: 'O->[' 

}
*/

/*
var grammar={

    1: 'S ->P'
    1: 'P -> i*id*; B*ConstBlock*  K*VarBlock* M*MainCode*' ,
    2: 'M -> b*begin* L*StatementList* e*end*. ',
    3: 'B -> c*const* C*ConstList*' ,
    3: 'B -> ε' ,
    4: 'C -> i = V*Value*; c' ,
    5: 'c -> ε' ,
    6: 'V -> n*v_int*'  ,
    6: 'V -> r*v_real*' ,
    6: 'V -> s*v_string*' ,
    7: 'K -> v*var* l*VarList*' ,
    7: 'K -> ε' ,
    8: 'l -> D*VarDecl* : T*Type* ; j' ,
    9: 'j -> ε' ,
    10: 'D -> i'  ,
    10: 'D -> i, d' ,
    11: 'T -> R*real*' ,
    11: 'T -> I*integer*' ,
    11: 'T -> S*string*' ,
    12: 'L*StatementList* -> m*Statement* y*StatementList1*'  ,
    12: 'y -> m' ,
    13: 'm -> F*ForStatement*'  ,
    14: 'm -> f*IfStatement*'  ,
    15: 'm -> A*Assign*'  ,
    16: 'm -> W*WriteLn*'  ,
    17: 'm -> w*Write*'  ,
    18: 'm -> k*break*;'  ,
    19: 'm -> n*continue*;' ,
    14: 'F -> o*for* i #*:=* V O*To* x*Expr* z*do* b t e;' ,
    15: 'f -> h*if* (x) H*then* b t e; g*else* b t e;' ,
    16: 'A -> i # x;' ,
    17: 'x -> N*not* x 1' ,
    18: 'x -> X*Expr2* 1' ,
    19: '1 -> Z*BooleanOp* X 1 ' ,
    19: '1 -> ε' ,
    20: 'X -> u*Expr3* 2*Expr2*' ,   
    21: '2 -> J*RelOp* u 2 ' ,
    21: '2 -> ε' ,
    22: 'u -> M*Term* 3' ,
    23: '3 -> + M 3' ,
    24: '3 -> - M 3' ,
    25: '3 -> ε',
    26: 'M -> G*Factor* Q*Term1*' ,
    27: 'Q -> * G Q' ,
    28: 'Q -> / G Q' ,
    29: 'Q -> ^*div* G Q' ,
    30: 'Q -> %*mod* G Q' ,
    31: 'Q -> ε',
    32: 'G -> i' ,
    33: 'G -> V' ,
    34: 'G -> (x)' ,
    35: '9*RelOp* -> = ' ,
    35: '9 -> 8*<>*' ,
    35: '9 -> < ' ,
    35: '9 -> 7*<=* ' ,
    35: '9 -> 6*>=* ' ,
    35: '9 -> >' ,
    36: 'Z -> 5*and* ',
    36: 'Z -> 4*or* ',
    37: 'W -> { ( V );' ,
    38: 'W -> { ( V, V);' ,
    39: 'W -> {*writeLn* ( V, V, V);' ,
    40: 'w -> w (x);',
    41: '}*To* -> ?*to* ' ,
    41: '} -> [*downto*' 

}
*/
/*
var grammar={
    1: Program -> program id; ConstBlock VarBlock MainCode ,
    2: MainCode -> begin StatementList end. ,
    3: ConstBlock -> const ConstList  | e ,
    4: ConstList -> id = Value; ConstList ,
    5: ConstList -> e ,
    6: Value -> v_int | v_real | v_string ,
    7: VarBlock -> var VarList  | e ,
    8: VarList -> VarDecl : Type ; VarList ,
    9: VarList -> e ,
    10: VarDecl -> id | id, VarDecl ,
    11: Type -> real | integer | string ,
    12: StatementList -> Statement StatementList | Statement ,
    13:Statement -> ForStatement | IfStatement | Assign | WriteLn | Write | break; | continue; ,
    14: ForStatement -> for id := Value To Expr do begin StatementList end; ,
    15: IfStatement -> if (Expr) then begin StatementList end; else begin StatementList end; ,
    16: Assign -> id := Expr; ,
    17: Expr -> not Expr Expr' ,
    18: Expr -> Expr2 Expr' ,
    19: Expr'-> BooleanOp Expr2 Expr' | e ,
    20: Expr2 -> Expr3 Expr2' ,   
    21: Expr2'-> RelOp Expr3 Expr2' | e ,
    22: Expr3 -> Term Expr3' ,
    23: Expr3'-> + Term Expr3' ,
    24: Expr3'-> - Term Expr3' ,
    25: Expr3'-> e
    26: Term -> Factor Term' ,
    27: Term' -> * Factor Term' ,
    28: Term' -> / Factor Term' ,
    29: Term' -> div Factor Term' ,
    30: Term' -> mod Factor Term' ,
    31: Term' -> e
    32: Factor -> id ,
    33: Factor -> Value ,
    34: Factor -> (Expr) ,
    35: RelOp -> = |<>| <| <=| >= | > ,
    36: BooleanOp -> and | or ,
    37: WriteLn -> writeln ( Value ); ,
    //<-
    38: WriteLn -> writeln ( Value, Value); ,
    39: WriteLn -> writeLn ( Value, Value, Value); ,
    40: Write -> write (Expr);//<-
    41: To -> to | downto 

}*/
var grammar = {
  1: 'S->A',
  2: 'A->EB',
  3: 'A->ORJBU',
  4: 'A->CZTBM',
  5: 'A->YV=N;B',
  6: 'E->W(N);',
  7: 'W->L',
  8: 'W->F',
  9: 'W->R',
  10: 'B->ε',
  11: 'B->A',
  12: 'L->l',
  13: 'F->f',
  14: 'O->o',
  15: 'R->r',
  16: 'N->n',
  17: 'I->i',
  18: 'C->c',
  19: 'Y->y',
  20: 'V->v',
  21: 'R->(I:N)',
  22: 'Z->(I==I)',
  23: 'J->{',
  24: 'U->}',
  25: 'T->[',
  26: 'M->]',
}
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
   // tokens = tokenSorter();
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
        if (temp == "int " && tokens[i+1]!= "e") {
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

        else if (temp == "{" ) {
            while(tokens[i].Token !="}" ){
                i++
            }
            
            //console.log("detect-> BEGIN and linea = " + linea);
            temp = "";
            add("{}", "SEPARADOR", "{}");
        }
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////
        else if (tipo_token(i)== "digit" ) {
           /* while(tipo_token(i)!= "digit" ){
                i++
                console.log("entro")
            }*/
            
            //console.log("detect-> BEGIN and linea = " + linea);
            temp = "";
            add("num", "digit", "d");
        }
////////////////////////////////////////////////////////////////////////////////////
        else if (temp == "'" ) {
            i=i+1;
            while(tokens[i].Token !="'" && tokens[i+1].Token != "'"  ){
                i++;
            }
            i=i+1;
            //console.log("detect-> BEGIN and linea = " + linea);
            temp = "";
            add("''", "STRING", "''");
        }

        else if (temp == "(" && tokens[i+1].Token=="*") {
            i=i+2;
            console.log(tokens[i].Token);
            
            while(tokens[i].Token !=")"  ){ 

                console.log(tokens[i].Token);
                i++;
            }

            console.log(tokens[i].Token);
            
            

            console.log(tokens[i].Token);
            //console.log("detect-> BEGIN and linea = " + linea);
            temp = "";
            add("(**)", "SEPARADOR", "(**)");
        }

       /* else if (tokens[i].Token == ":" && tokens[i+1].Token == "=") {
            
            if(temp.search("}")){
                var vari = temp.substring(temp.search("}")+1,i);
            } else{
                var vari = temp.substring(0,i);
            }
        
            //console.log("detect->  "+vari);
            //temp = "";
            //add(vari, "VAR", "y");
            //var secuense = "";
            //var variable = "";
            //var j = i + 1;
            /*while (secuense != ";") {
            secuense = tokens[j].Token;
                variable += secuense;
                j++;
            }
            //console.log("arg -> " + variable.substring(1, variable.length - 1));
            
            add(variable.substring(1, variable.length - 1), "arg", "v");
            var jump = variable.substring(0, variable.length - 1).length;
            i += jump;
        }*/



        /**************
                    DETECTAR ARRAY
         ***************/
        else if (temp == "array") {
            
            //console.log("detect-> BEGIN and linea = " + linea);
            temp = "";
            add("array", "ARRAY", "a");
        }

///////////////////////////////////////////////////////////
        else if (temp == "num") {
            
            //console.log("detect-> BEGIN and linea = " + linea);
            temp = "";
            add("variable", "variable", "v");
        }
        /*****************************/


        else if (temp == "sum") {
            
            //console.log("detect-> BEGIN and linea = " + linea);
            temp = "";
            add("variable", "variable", "v");
        }


        else if (temp == "age") {
            
            //console.log("detect-> BEGIN and linea = " + linea);
            temp = "";
            add("variable", "variable", "v");
        }



        else if (temp == "Writeln" ) {
            
            //console.log("detect-> BEGIN and linea = " + linea);
            temp = "";
            add("Writeln", "Writeln", "l");
        }
        /*****************************/
        else if (temp == "downto") {

          

            //console.log("detect-> fordware");
            temp = "";
            add("downto", "DOWNTO", "d");
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


        else if (temp == "Write" && tokens[i+1].Token != "l") {
            //console.log("detect-> FOR");
            temp = "";
            add("Write", "Write", "w");
        }

        /***********************************************/
         else if (temp == "test") {
            //console.log("detect-> FOR");
            temp = "";
            add("variable", "variable", "v");
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
        else if (temp == "*" && tokens[i+1].Token != "*") {
            //console.log("detect-> ==");


            temp = "";
            add("*", "OP_MUL", "*");

        }

        else if (temp == "counter" ) {
            //console.log("detect-> ==");

            
            temp = "";
            add("counter", "counter", "c");

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
            add("and", "OP_AND", "a");

        }  

         else if (temp == "or") {
            //console.log("detect-> ==");
            temp = "";
            add("or", "OP_OR", "or");

        }  

         else if (temp == "not") {
            //console.log("detect-> ==");
            temp = "";
            add("not", "OP_NOT", "n");

        }  

         else if (temp == "div") {
            //console.log("detect-> ==");
            temp = "";
            add("div", "OP_DIV", "d");

        }  

         else if (temp == "mod") {
            //console.log("detect-> ==");
            temp = "";
            add("mod", "OP_MOD", "m");

        }  

         /*else if (temp == "in") {
            //console.log("detect-> ==");
            temp = "";
            add("in", "OP_IN", "i");

        }  */

        else if (temp == "integer") {
            //console.log("detect-> ==");
            temp = "";
            add("integer", "integer", "I");

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
 /* var FinalInput = "";
    //print("\n ListToken\n");
    //console.log("ListToken");
    ToKens = new Array();
    ToKens = finalTokens();
    var compiler = "";



    for (var i = 0; i < ToKens.length; i++) {
        console.log(i + " -> " + ToKens[i].Token + " -> " + ToKens[i].Type );
        
        //console.log(i + "t " + token_traducer[i].Token + " -> " + token_traducer[i].Type);
        //print(i + " " + ToKens[i].Token + " -> " + ToKens[i].Type);
        traducerCode += token_traducer[i].Token;
    }

     for (var m = 0; m < ToKens.length; m++) {traducerCode += token_traducer[m].Token;}
    //print("SourceCode->: " + traducerCode);
    
    //var text = traducerCode;
    var text = o(i:n){l(n);};

     
    console.log(text);*/

    var text = "l(n);";
    startUp(grammar, text);
    traducerCode = "";
}

/****************************************************
 *******************  my_tree ************************
 *****************************************************/




function Node(data) {
    this.data = data;
    this.children = [];
}

class Tree {
    constructor() {
        this.root = null;
    }

    add(data, toNodeData) {
        const node = new Node(data);
        const parent = toNodeData ? this.findBFS(toNodeData) : null;
        if (parent) {
            parent.children.push(node)
        } else {
            if (!this.root)
                this.root = node;
            else
                return "nodo existe"
        }
    }

    findBFS(data) {
        const queue = [this.root];
        let _node = null;
        this.traverseBFS((node) => {
            if (node.data === data) {
                _node = node;
            }
        })

        return _node;
    }

    traverseBFS(cb) {
        const queue = [this.root];

        if (cb)
            while (queue.length) {
                const node = queue.shift();
                cb(node)
                for (const child of node.children) {
                    queue.push(child);
                }
            }
    }

    _preOrder(node, fn) {
        if (node) {
            if (fn) {
                fn(node);
            }
            for (let i = 0; i < node.children.length; i++) {
                this._preOrder(node.children[i], fn);
            }
        }
    }
    traverseDFS(fn, method) {
        const current = this.root;
        if (method) {
            this[`_${method}`](current, fn);
        } else {
            this._preOrder(current, fn);
        }
    }



}
let tree = new Tree()




///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
/****************************************************
 **************      PARSER    *******************
 *****************************************************/

//INCLUDE a LEXER
//import{hello} from "./lexer.js";

//const Table = require('cli-table');
var EPSILON = "ε";

var firstSets = {};
var followSets = {};
var terminals = [];
var nonTerminals = [];


function buildFirstSets(grammar) {
    firstSets = {};
    buildSet(firstOf);
}

function firstOf(symbol) {

    if (firstSets[symbol]) {
        return firstSets[symbol];
    }

    var first = firstSets[symbol] = {};
    if (isTerminal(symbol)) {
        first[symbol] = true;
        return firstSets[symbol];
    }

    var productionsForSymbol = getProductionsForSymbol(symbol);
    for (var k in productionsForSymbol) {
        var production = getRHS(productionsForSymbol[k]);

        for (var i = 0; i < production.length; i++) {
            var productionSymbol = production[i];
            if (productionSymbol === EPSILON) {
                first[EPSILON] = true;
                break;
            }

            var firstOfNonTerminal = firstOf(productionSymbol);

            if (!firstOfNonTerminal[EPSILON]) {
                merge(first, firstOfNonTerminal);
                break;
            }
            merge(first, firstOfNonTerminal, [EPSILON]);
        }
    }
    return first;
}

function getProductionsForSymbol(symbol) {
    var productionsForSymbol = {};
    for (var k in grammar) {
        if (grammar[k][0] === symbol) {
            productionsForSymbol[k] = grammar[k];
        }
    }
    return productionsForSymbol;
}

function getLHS(production) {
    return production.split('->')[0].replace(/\s+/g, '');
}

function getRHS(production) {
    return production.split('->')[1].replace(/\s+/g, '');
}

function buildFollowSets(grammar) {
    followSets = {};
    buildSet(followOf);
}

function followOf(symbol) {
    if (followSets[symbol]) {
        return followSets[symbol];
    }
    var follow = followSets[symbol] = {};

    if (symbol === START_SYMBOL) {
        follow['$'] = true;
    }

    var productionsWithSymbol = getProductionsWithSymbol(symbol);
    for (var k in productionsWithSymbol) {
        var production = productionsWithSymbol[k];
        var RHS = getRHS(production);

        var symbolIndex = RHS.indexOf(symbol);
        var followIndex = symbolIndex + 1;

        while (true) {

            if (followIndex === RHS.length) { // "$"
                var LHS = getLHS(production);
                if (LHS !== symbol) { // To avoid cases like: B -> aB
                    merge(follow, followOf(LHS));
                }
                break;
            }

            var followSymbol = RHS[followIndex];

            var firstOfFollow = firstOf(followSymbol);

            if (!firstOfFollow[EPSILON]) {
                merge(follow, firstOfFollow);
                break;
            }

            merge(follow, firstOfFollow, [EPSILON]);
            followIndex++;
        }
    }

    return follow;
}

function buildSet(builder) {
    for (var k in grammar) {
        builder(grammar[k][0]);
    }
}

function getProductionsWithSymbol(symbol) {
    var productionsWithSymbol = {};
    for (var k in grammar) {
        var production = grammar[k];
        var RHS = getRHS(production);
        if (RHS.indexOf(symbol) !== -1) {
            productionsWithSymbol[k] = production;
        }
    }
    return productionsWithSymbol;
}

function isTerminal(symbol) {
    return !/[A-Z]/.test(symbol);
}

function merge(to, from, exclude) {
    exclude || (exclude = []);
    for (var k in from) {
        if (exclude.indexOf(k) === -1) {
            to[k] = from[k];
        }
    }
}

function printGrammar(grammar) {
    console.log('Gramatica:\n');
    //print('Gramatica:\n');
    for (var k in grammar) {
        console.log('  ', grammar[k]);
        //print(" " + grammar[k]);
    }
    console.log('');
    //print(" ");
}

function printSet(name, set) {
    console.log(name + ': \n');
    //print(name + ": \n");
    for (var k in set) {
        console.log('  ', k, ':', Object.keys(set[k]));
        //print(" " + k + ":" + Object.keys(set[k]));
    }
    console.log('');
    //print('');
}





var parserTable;

/*************************************
 *           PRINT-->ELEMTS
 ***********************************/
function startUp(grammar, text) {
    //printGrammar(grammar);
    buildFirstSets(grammar);
    buildFollowSets(grammar);
    //printSet('Conjunto Primeros', firstSets);
    //printSet('Conjunto Segundos', followSets);
    buildNonTerminals(grammar);
    buildTerminals(grammar);
    parserTable = buildParserTable(grammar);
    return solve(text);
    //tree.traverseBFS((node) => { console.log(node) })

}

function buildNonTerminals(grammar) {
    for (var k in grammar) {
        let temp = getLHS(grammar[k]);
        if (nonTerminals.indexOf(temp) == -1) {
            nonTerminals.push(temp);
        }
    }
    //console.log("No Terminales: " + nonTerminals);
}

function buildTerminals(grammar) {
    for (var k in grammar) {
        let temp = getRHS(grammar[k]);
        for (var i = 0; i < temp.length; i++) {
            if (nonTerminals.indexOf(temp[i]) == -1 && terminals.indexOf(temp[i]) == -1) {
                terminals.push(temp[i]);
            }
        }
    }
    //console.log("Terminales: " + terminals);
}

function buildParserTable(grammar) {
    let ptable = {};

    for (var k in grammar) {
        var itRHS = getRHS(grammar[k]);
        var itLHS = getLHS(grammar[k]);
        if (itRHS != EPSILON) {
            let tempTerminals = firstSets[itRHS[0]];
            for (termTemp in tempTerminals) {
                ptable[itLHS] = ptable[itLHS] || {};
                ptable[itLHS][termTemp] = k;
            }
        } else {
            let tempTerminals = followSets[itLHS];
            for (termTemp in tempTerminals) {
                ptable[itLHS] = ptable[itLHS] || {};
                ptable[itLHS][termTemp] = k;
            }
        }
    }
    return ptable;
}

function solve(input) {
    let log = [],
        reg = 0;
    let consumedInput = "",
        remainInput = input + "$";
    let stack = ['$'];
    let action = "nothing!";
    stack.push(START_SYMBOL);

    var root = stack[stack.length - 1];
    //console.log("INICIAL-->" + root);
    tree.add(root);
    do {
        let top = stack[stack.length - 1];
        if (stack.length == 1 && remainInput == "$")
            action = "Accept!";

        else if (isTerminal(top) && action != EPSILON) {
            action = "Matched!";
            stack.pop();
            consumedInput += remainInput.slice(0, 1);
            remainInput = remainInput.slice(1);
        } else if (top == EPSILON)
            stack.pop();
        else {
            let num = parserTable[top][remainInput[0]];
            if (!num) {
                stack.pop();
                reg = 1;
            } else {
                action = getRHS(grammar[num]);
                if (top != remainInput[0]) {
                    stack.pop();
                    action.split('').reverse().map((t) => { stack.push(t) });
                    //_______________________TREE:_______________________
                    //console.log("stack: ", stack);
                    //console.log("Action: " + action + " size: " + action.length + " <--- Top: " + top);
                    for (var i = 0; i < action.length; i++) {
                        tree.add(action[i], top);
                        //console.log("FOR: " + action[i] + " <--- Top: " + top);
                    }
                }
            }
        }
        if (action == "Accept!") {
            //print("GRÁMATICA ACEPTADA");
            console.log("Gramatica Aceptada")
            return true;
            break;
        }
    } while (stack.length > 0);
    console.log((reg) ? "Ans: Tiene algunos errores" : "Ans: Accept!");
    //print((reg) ? "Ans: Tiene algunos errores" : "Ans: Accept!");
    console.log("-----------BFS---------");
  tree.traverseBFS(node => { console.log(node.data); });
  console.log("-----------DFS----------");
  tree.traverseDFS(node => { console.log(node.data); });

}
