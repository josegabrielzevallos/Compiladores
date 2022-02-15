//INCLUDE a LEXER
//import{hello} from "./lexer.js";

/**************************
 * ******** MY_TREE *******
 * ************************/

const Table = require('cli-table');
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
    for (var k in grammar) {
        console.log('  ', grammar[k]);
    }
    console.log('');
}

function printSet(name, set) {
    console.log(name + ': \n');
    for (var k in set) {
        console.log('  ', k, ':', Object.keys(set[k]));
    }
    console.log('');
}

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
    61: 'W->{(V,V);' ,s
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
var START_SYMBOL = 'S';
//var text = "l(n);";
var text = "o(i:n){l(n);}";
//var text = "o(i:n){f(n);c(i==n)[r(n);]}l(n);f(n);"
var text = "c(i==n)[r(n);]";

startUp(grammar, text);


var parserTable;


function startUp(grammar, text) {
  printGrammar(grammar);
  buildFirstSets(grammar);
  buildFollowSets(grammar);
  printSet('Conjunto Primeros', firstSets);
  printSet('Conjunto Segundos', followSets);
  buildNonTerminals(grammar);
  buildTerminals(grammar);
  parserTable = buildParserTable(grammar);
  drawParsingTable(grammar);
  solve(text);
}

function drawParsingTable(grammar) {
  let ptable = parserTable;
  let table = new Table({
    head: ['', ...terminals, '$']
  });
  nonTerminals.map((nonTerminalItem) => {
    let arr = [];
    terminals.map((terminalItem) => {
      arr.push(ptable[nonTerminalItem][terminalItem] || '');
    });
    arr.push(ptable[nonTerminalItem]['$'] || '');

    // console.log(ptable[item]);
    table.push([nonTerminalItem, ...arr]);
  });
  console.log(table.toString());
}

function buildNonTerminals(grammar) {
  for(var k in grammar) {
    let temp = getLHS(grammar[k]);
    if(nonTerminals.indexOf(temp) == -1) {
        nonTerminals.push(temp);
    }
  }
  console.log("No Terminales: "+ nonTerminals);
}

function buildTerminals(grammar) {
  for (var k in grammar) {
    let temp = getRHS(grammar[k]);
    for (var i = 0; i < temp.length; i++) {
      if(nonTerminals.indexOf(temp[i]) == -1 && terminals.indexOf(temp[i]) == -1 ) {
        terminals.push(temp[i]);
      }
    }
  }
  console.log("Terminales: "+terminals);
}

function buildParserTable(grammar) {
  let ptable = {};


  // i in nonTerminals
  // j in terminals
  for (var k in grammar) {
    var itRHS = getRHS(grammar[k]);
    var itLHS = getLHS(grammar[k]);
    if(itRHS != EPSILON) {
      let tempTerminals = firstSets[itRHS[0]];
      for (termTemp in tempTerminals) {
          ptable[itLHS] = ptable[itLHS] || {};
          ptable[itLHS][termTemp]=k;
      }
    }
    else {
      let tempTerminals = followSets[itLHS];
      for (termTemp in tempTerminals) {
          ptable[itLHS] = ptable[itLHS] || {};
          ptable[itLHS][termTemp]=k;
      }
    }
  }
  return ptable;
}

function solve(input) {
    let log = [], reg=0;
    let consumedInput = "", remainInput = input+"$";
    let stack = ['$']; let action="nothing!";
    stack.push(START_SYMBOL);
    do {
      let top = stack[stack.length-1];
      if (stack.length == 1 && remainInput=="$")
        action = "Accept!";

      else if(isTerminal(top) && action!= EPSILON){
        action = "Matched!";
        stack.pop();
        consumedInput+=remainInput.slice(0,1);
        remainInput = remainInput.slice(1);
      }
      else if(top == EPSILON)
        stack.pop();
      else {
        let num = parserTable[top][remainInput[0]];
        if(!num) {
            stack.pop();
            reg = 1;
        }
        else{
          action = getRHS(grammar[num]);
          // console.log("stack111: ",stack);
          if(top != remainInput[0]) {
            stack.pop();
            action.split('').reverse().map((t)=>{stack.push(t)});
//             for(var i=0; i<action.length; i++){
//                 tree.add(action[i],top);
//                 console.log("FOR: "+action[i]+" <--- Top: "+top);
//             }
          }
        }
      }
      let tmp = {
        consumed: consumedInput,
        stack: stack.join(),
        top: stack[stack.length-1],
        remain: remainInput,
        action :action
      };
      log.push(tmp);
      if(action == "Accept!") break;
    } while (stack.length > 0);
    // console.log(parserTable[top][remainInput[0]]);
    let newTable = new Table({
        head: [ 'CONSUMEDINPUT', 'STACK', 'REMAIN', 'ACTION']
    });

    for(item in log) {
      arr = [] ;
      // console.log(log[item]);
      arr.push(log[item].consumed)
      arr.push(log[item].stack)
      arr.push(log[item].remain)
      arr.push(log[item].action)
      newTable.push(arr);
    }
    console.log(newTable.toString());
     //console.log(log);
     //console.log("stack: ",stack);
    console.log((reg)?"Ans: Tiene algunos errores":"Ans: Accept!");
}
