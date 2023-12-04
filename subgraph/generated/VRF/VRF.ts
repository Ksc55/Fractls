// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class OwnershipTransferRequested extends ethereum.Event {
  get params(): OwnershipTransferRequested__Params {
    return new OwnershipTransferRequested__Params(this);
  }
}

export class OwnershipTransferRequested__Params {
  _event: OwnershipTransferRequested;

  constructor(event: OwnershipTransferRequested) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class RequestFulfilled extends ethereum.Event {
  get params(): RequestFulfilled__Params {
    return new RequestFulfilled__Params(this);
  }
}

export class RequestFulfilled__Params {
  _event: RequestFulfilled;

  constructor(event: RequestFulfilled) {
    this._event = event;
  }

  get requestId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get randomWords(): Array<BigInt> {
    return this._event.parameters[1].value.toBigIntArray();
  }
}

export class RequestSent extends ethereum.Event {
  get params(): RequestSent__Params {
    return new RequestSent__Params(this);
  }
}

export class RequestSent__Params {
  _event: RequestSent;

  constructor(event: RequestSent) {
    this._event = event;
  }

  get requestId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get numWords(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class VRF__getRequestStatusResult {
  value0: boolean;
  value1: Array<BigInt>;

  constructor(value0: boolean, value1: Array<BigInt>) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigIntArray(this.value1));
    return map;
  }

  getFulfilled(): boolean {
    return this.value0;
  }

  getRandomWords(): Array<BigInt> {
    return this.value1;
  }
}

export class VRF__s_requestsResult {
  value0: boolean;
  value1: boolean;

  constructor(value0: boolean, value1: boolean) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromBoolean(this.value0));
    map.set("value1", ethereum.Value.fromBoolean(this.value1));
    return map;
  }

  getFulfilled(): boolean {
    return this.value0;
  }

  getExists(): boolean {
    return this.value1;
  }
}

export class VRF extends ethereum.SmartContract {
  static bind(address: Address): VRF {
    return new VRF("VRF", address);
  }

  getRequestStatus(_requestId: BigInt): VRF__getRequestStatusResult {
    let result = super.call(
      "getRequestStatus",
      "getRequestStatus(uint256):(bool,uint256[])",
      [ethereum.Value.fromUnsignedBigInt(_requestId)]
    );

    return new VRF__getRequestStatusResult(
      result[0].toBoolean(),
      result[1].toBigIntArray()
    );
  }

  try_getRequestStatus(
    _requestId: BigInt
  ): ethereum.CallResult<VRF__getRequestStatusResult> {
    let result = super.tryCall(
      "getRequestStatus",
      "getRequestStatus(uint256):(bool,uint256[])",
      [ethereum.Value.fromUnsignedBigInt(_requestId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new VRF__getRequestStatusResult(
        value[0].toBoolean(),
        value[1].toBigIntArray()
      )
    );
  }

  lastRequestId(): BigInt {
    let result = super.call("lastRequestId", "lastRequestId():(uint256)", []);

    return result[0].toBigInt();
  }

  try_lastRequestId(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "lastRequestId",
      "lastRequestId():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  requestIds(param0: BigInt): BigInt {
    let result = super.call("requestIds", "requestIds(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toBigInt();
  }

  try_requestIds(param0: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall("requestIds", "requestIds(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  requestRandomWords(): BigInt {
    let result = super.call(
      "requestRandomWords",
      "requestRandomWords():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_requestRandomWords(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "requestRandomWords",
      "requestRandomWords():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  s_requests(param0: BigInt): VRF__s_requestsResult {
    let result = super.call("s_requests", "s_requests(uint256):(bool,bool)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return new VRF__s_requestsResult(
      result[0].toBoolean(),
      result[1].toBoolean()
    );
  }

  try_s_requests(param0: BigInt): ethereum.CallResult<VRF__s_requestsResult> {
    let result = super.tryCall(
      "s_requests",
      "s_requests(uint256):(bool,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new VRF__s_requestsResult(value[0].toBoolean(), value[1].toBoolean())
    );
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get subscriptionId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AcceptOwnershipCall extends ethereum.Call {
  get inputs(): AcceptOwnershipCall__Inputs {
    return new AcceptOwnershipCall__Inputs(this);
  }

  get outputs(): AcceptOwnershipCall__Outputs {
    return new AcceptOwnershipCall__Outputs(this);
  }
}

export class AcceptOwnershipCall__Inputs {
  _call: AcceptOwnershipCall;

  constructor(call: AcceptOwnershipCall) {
    this._call = call;
  }
}

export class AcceptOwnershipCall__Outputs {
  _call: AcceptOwnershipCall;

  constructor(call: AcceptOwnershipCall) {
    this._call = call;
  }
}

export class RawFulfillRandomWordsCall extends ethereum.Call {
  get inputs(): RawFulfillRandomWordsCall__Inputs {
    return new RawFulfillRandomWordsCall__Inputs(this);
  }

  get outputs(): RawFulfillRandomWordsCall__Outputs {
    return new RawFulfillRandomWordsCall__Outputs(this);
  }
}

export class RawFulfillRandomWordsCall__Inputs {
  _call: RawFulfillRandomWordsCall;

  constructor(call: RawFulfillRandomWordsCall) {
    this._call = call;
  }

  get requestId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get randomWords(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }
}

export class RawFulfillRandomWordsCall__Outputs {
  _call: RawFulfillRandomWordsCall;

  constructor(call: RawFulfillRandomWordsCall) {
    this._call = call;
  }
}

export class RequestRandomWordsCall extends ethereum.Call {
  get inputs(): RequestRandomWordsCall__Inputs {
    return new RequestRandomWordsCall__Inputs(this);
  }

  get outputs(): RequestRandomWordsCall__Outputs {
    return new RequestRandomWordsCall__Outputs(this);
  }
}

export class RequestRandomWordsCall__Inputs {
  _call: RequestRandomWordsCall;

  constructor(call: RequestRandomWordsCall) {
    this._call = call;
  }
}

export class RequestRandomWordsCall__Outputs {
  _call: RequestRandomWordsCall;

  constructor(call: RequestRandomWordsCall) {
    this._call = call;
  }

  get requestId(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}