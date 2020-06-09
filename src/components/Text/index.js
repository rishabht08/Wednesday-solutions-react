import React, { useEffect, memo, useState } from "react";
import { Typography } from "antd";

const { Text } = Typography;

export default function TextField(props) {
  return (
    <div>
      <Text>Searched Query: </Text>
      <Text mark>{props.value}</Text>
    </div>
  );
}
